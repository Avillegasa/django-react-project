from django.contrib.auth.models import AbstractUser
from django.db import models

class UserProfile(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username

    # Agrega `related_name` para evitar conflictos
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
