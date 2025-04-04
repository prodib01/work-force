from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Prompt, Assessment, ConversationThread, Message
from .serializers import (
    PromptSerializer, AssessmentSerializer,
    ConversationThreadSerializer, MessageSerializer
)
from .services import AssessmentService

class PromptViewSet(viewsets.ModelViewSet):
    queryset = Prompt.objects.all().order_by('-created_at')
    serializer_class = PromptSerializer


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all().order_by('-created_at')
    serializer_class = AssessmentSerializer

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = ConversationThread.objects.all()
    serializer_class = ConversationThreadSerializer
    
    @action(detail=True, methods=['post'])
    def add_message(self, request, pk=None):
        user_message = request.data.get('message')
        if not user_message:
            return Response(
                {'error': 'Message content is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        service = AssessmentService()
        result = service.continue_conversation(pk, user_message)
        
        if result.get('error'):
            return Response({'error': result['error']}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response(result)
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        try:
            conversation = ConversationThread.objects.get(pk=pk)
            messages = conversation.messages.all().order_by('timestamp')
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        except ConversationThread.DoesNotExist:
            return Response(
                {'error': 'Conversation not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

class MessageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer