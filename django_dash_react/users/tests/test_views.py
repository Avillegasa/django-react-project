# django_dash_react/users/tests/test_views.py

import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import UserProfile

@pytest.mark.django_db
def test_register_user_success():
    client = APIClient()
    url = reverse('register')
    data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password123",
        "phone": "1234567890",
        "full_name": "Test User"
    }
    response = client.post(url, data, format='json')
    
    assert response.status_code == 201
    assert UserProfile.objects.filter(username="testuser").exists()

@pytest.mark.django_db
def test_register_user_with_existing_email():
    client = APIClient()
    url = reverse('register')
    # Crear un usuario con el mismo correo electrónico
    UserProfile.objects.create_user(username="existinguser", email="existing@example.com", password="password123")
    
    data = {
        "username": "newuser",
        "email": "existing@example.com",  # Email ya existente
        "password": "password123",
        "phone": "1234567890",
        "full_name": "New User"
    }
    response = client.post(url, data, format='json')
    
    assert response.status_code == 400
    assert "email" in response.data  # Verifica que el error esté relacionado con el campo de email


#Pruebas unitarias para el registro de usuario 
@pytest.mark.django_db
@pytest.mark.django_db
def test_login_user_success():
    client = APIClient()
    # Crear un usuario previamente
    user = UserProfile.objects.create_user(username="testuser", email="testuser@example.com", password="password123")
    
    url = reverse('login')
    data = {
        "username": "testuser",
        "password": "password123"
    }
    response = client.post(url, data, format='json')
    
    # Debugging: print response data if the status code is not 200
    if response.status_code != 200:
        print("Response data:", response.data)
    
    assert response.status_code == 200
    assert "token" in response.data  # Verifica que se devuelve un token


#Pruebas unitarias para el login del usuario
@pytest.mark.django_db
def test_login_user_invalid_credentials():
    client = APIClient()
    # Crear un usuario previamente
    user = UserProfile.objects.create_user(username="testuser", email="testuser@example.com", password="password123")
    
    url = reverse('login')
    data = {
        "username": "testuser",
        "password": "wrongpassword"
    }
    response = client.post(url, data, format='json')
    
    assert response.status_code == 400
    assert "error" in response.data  # Verifica que se devuelve un mensaje de error
