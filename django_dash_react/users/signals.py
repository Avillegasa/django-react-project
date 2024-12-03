# users/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender='users.UserProfile')  # Asegúrate de que 'users.UserProfile' está correctamente referenciado
def assign_user_permissions(sender, instance, created, **kwargs):
    if created:
        from .permissions import assign_permissions  # Importamos aquí para evitar la importación circular
        assign_permissions(instance)
