from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

class UserProfileManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)


class UserProfile(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True, blank=False)  # El email no puede ser vacío
    full_name = models.CharField(max_length=255, blank=True, null=True)  # Asegúrate de que sea nullable
    phone = models.CharField(max_length=15, blank=True)
    role = models.CharField(
        max_length=100,
        choices=[('admin', 'Administrador'), ('operador', 'Operador'), ('analista', 'Analista')],
        default='admin'
    )
    date_joined = models.DateTimeField(default=timezone.now)  # Asegúrate de tener esto


    objects = UserProfileManager()

    USERNAME_FIELD = 'email'  # Establece 'email' como el campo principal para la autenticación
    REQUIRED_FIELDS = ['username']  # Los campos requeridos para crear un superusuario

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.username

    groups = models.ManyToManyField(
        'auth.Group',
        related_name="user_profile_groups",  
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups"
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name="user_profile_permissions",  
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions"
    )
