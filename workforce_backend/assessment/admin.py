from django.contrib import admin
from .models import Prompt, Assessment, ConversationThread, Message

admin.site.register(Prompt)
admin.site.register(Assessment)
admin.site.register(ConversationThread)
admin.site.register(Message)
