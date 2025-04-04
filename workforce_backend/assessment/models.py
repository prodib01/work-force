from django.db import models
from users.models import Company

class Prompt(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    prompt_text = models.TextField()
    time_limit = models.IntegerField(default=30)
    performance_weight = models.IntegerField(default=33)
    behavioral_weight = models.IntegerField(default=33)
    cultural_fit_weight = models.IntegerField(default=34)
    difficulty = models.CharField(
        max_length=10,
        choices=DIFFICULTY_CHOICES,
        default='medium'
    )
    question_types = models.CharField(max_length=255)
    skills = models.JSONField(default=list)
    company_context = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.prompt_text
    

class Assessment(models.Model):
    prompt = models.ForeignKey(Prompt, on_delete=models.CASCADE, related_name='assessments')
    title = models.CharField(max_length=255)
    content = models.TextField() #stores the formatted assessment
    raw_response = models.JSONField() #stores the raw response from the API
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class ConversationThread(models.Model):
    title = models.CharField(max_length=255)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='conversation_threads')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Message(models.Model):
    MESSAGE_TYPES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
    ]
    conversation = models.ForeignKey(ConversationThread, on_delete=models.CASCADE, related_name='messages')
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    raw_response = models.JSONField() #stores the raw response from the API
    time_stamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.message_type} message in {self.conversation}"
