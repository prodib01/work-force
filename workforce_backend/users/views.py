from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Company
from .serializers import UserSerializer, CompanySerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def perform_create(self, serializer):
        user_id = self.request.data.get('user')  # Get the user ID from the request data
        try:
            user = User.objects.get(id=user_id)  # Fetch the User instance
        except User.DoesNotExist:
            raise ValueError("User does not exist")  # Handle the case if the user doesn't exist
        
        # Now save the company instance with the actual user object
        serializer.save(user=user)


# class CompanyViewSet(viewsets.ModelViewSet):
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer

#     def perform_create(self, serializer):
#         user = self.request.user  # Automatically fetch the logged-in user
#         serializer.save(user=user)


@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        full_name = data.get('full_name')
        
        # Validate input
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'User with this email already exists'}, status=400)
        
        # Create user
        user = User(
            email=email,
            full_name=full_name,
            is_active=True
        )
        user.set_password(password)
        user.save()
        
        
        # Generate token
        token = user.generate_jwt()
        
        return JsonResponse({
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': str(user.id),
                'email': user.email,
                'full_name': user.full_name
            }
        }, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        # Validate input
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)
        
        # Find user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
        
        # Check password
        if not user.check_password(password):
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
        
        # Check if user is active
        if not user.is_active:
            return JsonResponse({'error': 'Account is deactivated'}, status=403)
        
        # Generate token
        token = user.generate_jwt()
        
        return JsonResponse({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': str(user.id),
                'email': user.email,
                'full_name': user.full_name
            }
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
