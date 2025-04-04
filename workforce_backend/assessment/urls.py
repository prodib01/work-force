from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PromptViewSet, AssessmentViewSet, 
    ConversationViewSet, MessageViewSet
)

router = DefaultRouter()
router.register(r'prompts', PromptViewSet)
router.register(r'assessments', AssessmentViewSet)
router.register(r'conversations', ConversationViewSet)
router.register(r'messages', MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]