# users/permissions.py

from django.contrib.auth.models import Group, Permission

def assign_permissions(user):
    # Importar el modelo dentro de la función para evitar la importación circular
    from .models import UserProfile

    role = user.role
    if role == 'Administrador':
        # Asignar permisos de administrador
        permissions = Permission.objects.all()
        user.user_permissions.set(permissions)
    elif role == 'Operador':
        # Asignar permisos de operador
        permissions = Permission.objects.filter(codename__in=['view_incautacion', 'view_inventario'])
        user.user_permissions.set(permissions)
    elif role == 'Analista':
        # Asignar permisos de analista
        permissions = Permission.objects.filter(codename__in=['view_inventario', 'view_estadisticas'])
        user.user_permissions.set(permissions)
