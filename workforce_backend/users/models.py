from django.db import models
from django.contrib.auth.models import AbstractUser
import bcrypt
import jwt
from datetime import datetime, timedelta
from django.conf import settings

class User(models.Model):
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def set_password(self, password):
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpw(password_bytes, salt).decode('utf-8')

    def check_password(self, password):
        password_bytes = password.encode('utf-8')
        hash_bytes = self.password_hash.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hash_bytes)
    
    def generate_jwt(self):
        payload = {
            'user_id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'exp': datetime.utcnow() + timedelta(days=1)
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token
    
    @staticmethod
    def verify_jwt(token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def __str__(self):
        return self.full_name

class Company(models.Model):
    COMPANY_SIZE_CHOICES = [
        ('1-5', '1-5 employees'),
        ('6-10', '6-10 employees'),
        ('11-50', '11-50 employees'),
        ('51-100', '51-100 employees'),
        ('100+', 'More than 100 employees'),
    ]
    COMPANY_STRUCTURE_CHOICES = [
        ('startup', 'Startup'),
        ('small_business', 'Small Business'),
        ('enterprise', 'Enterprise'),
        ('nonprofit', 'Nonprofit'),
    ]
    WORK_ENVIRONMENT_CHOICES = [
        ('remote', 'Remote'),
        ('hybrid', 'Hybrid'),
        ('office_based', 'Office Based'),
    ]
    COMMUNICATION_STYLE_CHOICES = [
        ('async_first', 'Async-first'),
        ('real_time', 'Real-time'),
        ('hybrid', 'Hybrid'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="companies", null=True, blank=True)
    company_name = models.CharField(max_length=255, blank=True, null=True, unique=True)
    company_size = models.CharField(
         max_length=10,
         choices=COMPANY_SIZE_CHOICES,
         default='1-5'
    )
    headquarters = models.CharField(max_length=255, blank=True)
    year_founded = models.IntegerField(blank=True, null=True)
    company_structure = models.CharField(
         max_length=20,
         choices=COMPANY_STRUCTURE_CHOICES,
         default='startup'
    )
    work_environment = models.CharField(
         max_length=20,
         choices=WORK_ENVIRONMENT_CHOICES,
         default='remote'
    )
    communication_style = models.CharField(
         max_length=20,
         choices=COMMUNICATION_STYLE_CHOICES,
         default='async_first'
    )
    team_structure_overview = models.TextField(blank=True)

    def __str__(self):
        return self.company_name


