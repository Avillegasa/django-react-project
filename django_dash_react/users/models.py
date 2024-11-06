from django.contrib.auth.models import AbstractUser
from django.db import models

class UserProfile(AbstractUser):
    email = models.EmailField(unique=True)
    # Otros campos adicionales si son necesarios
