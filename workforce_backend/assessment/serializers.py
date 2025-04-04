from rest_framework import serializers
from .models import (
    Prompt, Assessment, ConversationThread, Message
)

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = ['id', 'prompt_text', 'time_limit', 'difficulty', 'question_types', 'skills', 'company_context', 'performance_weight', 'behavioral_weight', 'cultural_fit_weight']
        read_only_fields = ['created_at', 'updated_at']

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ['id', 'prompt', 'title', 'content', 'raw_response']
        read_only_fields = ['created_at']

class ConversationThreadSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    message_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ConversationThread
        fields = ['id', 'title', 'assessment', 'created_at', 'updated_at', 'last_message', 'message_count']
    
    def get_last_message(self, obj):
        last_msg = obj.messages.order_by('-timestamp').first()
        if last_msg:
            return MessageSerializer(last_msg).data
        return None
    
    def get_message_count(self, obj):
        return obj.messages.count()

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'message_type', 'content', 'raw_response']
        read_only_fields = ['time_stamp']                        