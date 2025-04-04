from .anthropic_client import AnthropicClient
from .models import Prompt, Assessment, ConversationThread, Message

class AssessmentService:
    def __init__(self):
        self.client = AnthropicClient()

    def generate_assessment_from_prompt(self, prompt_id):
        """
        Generate assessment and store both assessment and conversation
        """
        try:
            prompt = Prompt.objects.get(id=prompt_id)

            # convert model data to params dictionaary
            assessment_params = {
                "time_limit": prompt.time_limit,
                "difficulty": prompt.difficulty,
                "question_types": prompt.question_types,
                "skills": prompt.skills,
                "company_context": prompt.company_context.company_name if prompt.company_context else None,
                "weights": {
                    "performance_weight": prompt.performance_weight,
                    "behavioral_weight": prompt.behavioral_weight,
                    "cultural_fit_weight": prompt.cultural_fit_weight
                }
            }

            # call anthropic api
            response = self.client.generate_assessment(
                role=prompt.prompt_text,
                assessment_params=assessment_params
            )

            if response.get('error'):
                return {'error': response.get('message')}
            
            # extract text from api response
            assessment_text = ""
            content = response.get('content', [])
            for item in content:
                if item.get('type') == 'text':
                    assessment_text += item.get('text', '')

            assessment =Assessment.objects.create(
                prompt=prompt,
                title=f"Assessment for {prompt.prompt_text}",
                content=assessment_text,
                raw_response=response
            )

            # create conversation thread and store initial messages
            conversation = ConversationThread.objects.create(
                title=f"Assessment Conversation for {prompt.prompt_text}",
                assessment=assessment
            )    

            #store initial prompt
            prompt_content = self.client._create_detailed_prompt(prompt.prompt_text, assessment_params)
            Message.objects.create(
                conversation=conversation,
                message_type='user',
                content=prompt_content
            ) 

            #store the assistant's response
            Message.objects.create(
                conversation=conversation,
                message_type='assistant',
                content=assessment_text,
                raw_response=response
            )   

            return {
                'success': True,
                'assessment_id': assessment.id,
                'conversation_id': conversation.id,
                'content': assessment_text
            }
        
        except Prompt.DoesNotExist:
            return {'error': 'Prompt not found'}
        except Exception as e:
            return {'error': str(e)}
        

    def continue_conversation(self, conversation_id, user_message):
        """
        Add to anexisting conversation thread
        """
        try:
            conversation = ConversationThread.objects.get(id=conversation_id)

            #save user message
            Message.objects.create(
                conversation=conversation,
                message_type='user',
                content=user_message
            )

            #get conversation history
            messages_history = []
            for msg in conversation.messages.all().order_by('time_stamp'):
                messages_history.append({
                    "role": "user" if msg.message_type == 'user' else "assistant",
                    "content": msg.content
                })

            #call api with conversation history
            payload = {
                "model": "claude-3-opus-20240229",
                "max_tokens": 2000,
                "temperature": 0.7,
                "messages": messages_history + [{"role": "user", "content": user_message}]
            } 

            #reuse the client's headers and base_url
            response = self.client._make_api_call(payload)

            if response.get('error'):
                return {'error': response.get('message')}   
            
            #extract response
            assistant_response = ""
            content = response.get('content', [])
            for item in content:
                if item.get('type') == 'text':
                    assistant_response += item.get('text', '')

            #save assistant response
            Message.objects.create(
                conversation=conversation,
                message_type='assistant',
                content=assistant_response,
                raw_response=response
            )

            #update conversation timestamp
            conversation.save()   

            return {
                'success': True,
                'message_id': conversation.messages.last().id,
                'content': assistant_response
            }

        except ConversationThread.DoesNotExist:
            return {'error': 'Conversation not found'}
        except Exception as e:
            return {'error': str(e)}   