from rest_framework import serializers

from .models import User, Company

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name']  

class CompanySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  

    class Meta:
        model = Company
        fields = ['id', 'user', 'company_name', 'company_size', 'headquarters', 'year_founded', 'company_structure', 'work_environment', 'communication_style', 'team_structure_overview']
        