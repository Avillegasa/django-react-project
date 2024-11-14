# users/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.contrib.auth import authenticate, get_user_model
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()

class RegisterUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class LoginUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Se requieren todos los campos"}, status=status.HTTP_400_BAD_REQUEST)

        # Autenticar al usuario
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener o crear el token
        try:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        except Exception as e:
            print("Error al crear o recuperar el token:", e)
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    if request.user.role == 'Administrador':
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data)
    return Response({'error': 'No tiene permiso para ver esta información.'}, status=403)

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.user.role != 'Administrador':
            return Response({'error': 'No tiene permiso para crear usuarios.'}, status=status.HTTP_403_FORBIDDEN)
        return super().post(request, *args, **kwargs)

class UpdateDeleteUserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        if request.user.role != 'Administrador':
            return Response({'error': 'No tiene permiso para actualizar usuarios.'}, status=status.HTTP_403_FORBIDDEN)
        return super().put(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if request.user.role != 'Administrador':
            return Response({'error': 'No tiene permiso para eliminar usuarios.'}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)
