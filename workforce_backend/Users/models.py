from django.db import models
from django.contrib.auth.models import AbstractUser

class User(models.Model):
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="companies")
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



