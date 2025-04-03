from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, register, login, get_user_profile

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('user-details/', get_user_profile, name='user_details'),
]