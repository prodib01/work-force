import os
import requests
import json
from typing import List, Dict, Any, Optional

class AnthropicClient:
    def __init__(self):
        self.api_key = os.environ.get('ANTHROPIC_API_KEY')
        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY environment variable is not set")
        
        self.base_url = "https://api.anthropic.com/v1/messages"
        self.headers = {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }

    def generate_assessment(self, 
                           role: str, 
                           assessment_params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate an assessment for a job role based on specified parameters
        
        Args:
            role (str): The job title or role description
            assessment_params (dict): Parameters for customizing the assessment
                - time_limit (int): Time limit in minutes
                - difficulty (str): Easy, Medium, or Hard
                - question_types (list): Types of questions to include
                - skills (list): Skills to assess
                - company_context (str): Company information for contextualization
                - weights (dict): Performance, behavioral, cultural_fit weights
                
        Returns:
            dict: The API response with assessment content
        """
        prompt = self._create_detailed_prompt(role, assessment_params)

        payload = {
            "model": "claude-3-opus-20240229",
            "max_tokens": 4000,
            "temperature": 0.7,  # Add some creativity but not too random
            "messages": [{"role": "user", "content": prompt}]
        } 

        try:
            response = requests.post(self.base_url, headers=self.headers, json=payload)
            response.raise_for_status()  # Raise exception for HTTP errors
            return response.json()
        except requests.exceptions.RequestException as e:
            # Handle API errors gracefully
            return {
                "error": True,
                "message": str(e),
                "status_code": getattr(e.response, 'status_code', None) if hasattr(e, 'response') else None
            }
    
    def _create_detailed_prompt(self, role: str, params: Dict[str, Any]) -> str:
        """
        Create a detailed prompt for Claude based on assessment parameters
        
        Args:
            role (str): The job role
            params (dict): Assessment parameters
            
        Returns:
            str: Formatted prompt for Claude
        """
        # Extract parameters with defaults
        time_limit = params.get('time_limit', 30)
        difficulty = params.get('difficulty', ['Medium'])[0] if isinstance(params.get('difficulty', []), list) else params.get('difficulty', 'Medium')
        question_types = params.get('question_types', [])
        skills = params.get('skills', [])
        company_context = params.get('company_context', [])
        weights = params.get('weights', {
            'performance': 33,
            'behavioral': 33,
            'cultural_fit': 34
        })
        
        # Create detailed prompt with clear structure
        prompt = f"""You are an expert job assessment designer with years of experience creating effective hiring assessments for top companies.

Your task is to create a professional job assessment for the role of "{role}" based on the following parameters:

ASSESSMENT PARAMETERS:
- Time limit: {time_limit} minutes
- Difficulty level: {difficulty}
- Performance weight: {weights.get('performance', 33)}%
- Behavioral weight: {weights.get('behavioral', 33)}%
- Cultural fit weight: {weights.get('cultural_fit', 34)}%
"""

        # Add question types if provided
        if question_types:
            question_types_str = ", ".join(question_types)
            prompt += f"- Question types: {question_types_str}\n"
        
        # Add skills if provided
        if skills:
            skills_str = ", ".join(skills)
            prompt += f"- Skills to assess: {skills_str}\n"
        
        # Add company context if provided
        if company_context:
            company_context_str = ", ".join(company_context)
            prompt += f"- Company context: {company_context_str}\n"
        
        # Add detailed instructions
        prompt += f"""
Please create a comprehensive assessment that:
1. Is appropriate for the specified time limit of {time_limit} minutes
2. Balances performance, behavioral, and cultural fit according to the weights
3. Tests the specific skills requested
4. Incorporates the company context naturally
5. Matches the {difficulty} difficulty level
"""

        # Format based on question types
        if "Multiple-choice questions" in question_types:
            prompt += "\nInclude multiple-choice questions with 4-5 options each and clearly mark the correct answer for the hiring manager.\n"
        
        if "Situational judgment tests" in question_types:
            prompt += "\nInclude realistic workplace scenarios with multiple possible responses, ranking from most to least effective.\n"
        
        if "Open-ended questions" in question_types:
            prompt += "\nInclude thought-provoking open-ended questions with sample strong answers and evaluation criteria.\n"
        
        if "Coding challenges" in question_types:
            prompt += "\nInclude practical coding challenges with clear requirements, sample solutions, and evaluation rubrics.\n"
        
        # Add structure for the response
        prompt += """
FORMAT YOUR RESPONSE WITH THE FOLLOWING SECTIONS:

ASSESSMENT OVERVIEW:
[Brief summary of the assessment, appropriate skills tested, and how it relates to the role]

ASSESSMENT QUESTIONS:
[Numbered questions with clear instructions]

EVALUATION GUIDELINES:
[Detailed criteria for hiring managers to evaluate responses, including what constitutes poor, acceptable, and excellent answers]

TIME ALLOCATION:
[Suggested breakdown of how candidates should use their time]

Each question should clearly indicate whether it's primarily assessing performance, behavioral attributes, or cultural fit.
"""
        
        return prompt

    def generate_single_question(self, 
                                role: str, 
                                question_prompt: str,
                                params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate a single assessment question based on a specific prompt
        
        Args:
            role (str): The job role
            question_prompt (str): Specific area or prompt for the question
            params (dict): Question parameters
            
        Returns:
            dict: The API response with the generated question
        """
        prompt = self._create_single_question_prompt(role, question_prompt, params)
        
        payload = {
            "model": "claude-3-opus-20240229",
            "max_tokens": 2000,
            "temperature": 0.6,
            "messages": [{"role": "user", "content": prompt}]
        }
        
        try:
            response = requests.post(self.base_url, headers=self.headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {
                "error": True,
                "message": str(e),
                "status_code": getattr(e.response, 'status_code', None) if hasattr(e, 'response') else None
            }
    
    def _create_single_question_prompt(self, role: str, question_prompt: str, params: Dict[str, Any]) -> str:
        """Create a prompt for generating a single assessment question"""
        
        # Extract parameters
        difficulty = params.get('difficulty', ['Medium'])[0] if isinstance(params.get('difficulty', []), list) else params.get('difficulty', 'Medium')
        question_type = params.get('question_types', ['Open-ended questions'])[0] if params.get('question_types') else 'Open-ended questions'
        skills = params.get('skills', [])
        company_context = params.get('company_context', [])
        time_limit = params.get('time_limit', 15)
        
        prompt = f"""You are an expert job assessment designer. Create a professional {difficulty}-level {question_type} for a {role} position based on this specific area:

ASSESSMENT AREA: {question_prompt}

PARAMETERS:
- Time to answer: {time_limit} minutes
- Difficulty: {difficulty}
- Question type: {question_type}
"""

        if skills:
            prompt += f"- Skills to assess: {', '.join(skills)}\n"
            
        if company_context:
            prompt += f"- Company context: {', '.join(company_context)}\n"
        
        prompt += """
FORMAT YOUR RESPONSE WITH:

QUESTION TITLE: [Brief descriptive title]

SCENARIO: [Any relevant context or situation]

MAIN QUESTION: [Clear, concise question]

INSTRUCTIONS: [How the candidate should approach the answer]

EVALUATION CRITERIA: [Hidden from candidate - specific points the hiring manager should look for]

Make the question challenging but fair, relevant to the role, and designed to reveal meaningful insights about the candidate's abilities.
"""
        
        return prompt
    
    def _make_api_call(self, payload):
        """
        Make a direct API call with the given payload
        
        Args:
            payload (dict): The full payload for the API request
            
        Returns:
            dict: The API response
        """
        try:
            response = requests.post(self.base_url, headers=self.headers, json=payload)
            response.raise_for_status()  # Raise exception for HTTP errors
            return response.json()
        except requests.exceptions.RequestException as e:
            # Handle API errors gracefully
            return {
                "error": True,
                "message": str(e),
                "status_code": getattr(e.response, 'status_code', None) if hasattr(e, 'response') else None
            }