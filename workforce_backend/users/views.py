from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Company
from .serializers import UserSerializer, CompanySerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .authentication import JWTAuthentication


class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get_queryset(self):
        # Filter by the authenticated user
        return Company.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Set the user automatically when creating
        serializer.save(user=self.request.user)



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
    

@csrf_exempt
@require_http_methods(["GET"])
def get_user_profile(request):
    try:
        # Get the token from the Authorization header
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Invalid authorization header'}, status=401)
        
        token = auth_header.split(' ')[1]
        
        # Verify token
        payload = User.verify_jwt(token)
        if payload is None:
            return JsonResponse({'error': 'Invalid or expired token'}, status=401)
        
        # Get user from payload
        user_id = payload.get('user_id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        
        # Check if user is active
        if not user.is_active:
            return JsonResponse({'error': 'Account is deactivated'}, status=403)
        
        # Return user profile data
        return JsonResponse({
            'user': {
                'id': user.id,
                'email': user.email,
                'full_name': user.full_name,
                'created_at': user.created_at.isoformat(),
                'is_active': user.is_active
            }
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)