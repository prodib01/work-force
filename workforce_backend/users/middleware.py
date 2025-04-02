from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from .models import User

class JWTAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        public_paths = ['/auth/login/', '/auth/register/']

        if request.path.startswith('/admin/'):
            return None

        if request.path in public_paths:
            return None
        
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Invalid Authorization header'}, status=401)

        token = auth_header.split(' ')[1]
        payload = User.verify_jwt(token)

        if not payload:
            return JsonResponse({'error': 'Invalid token'}, status=401)
        
        request.user_id = payload.get('user_id')
        return None