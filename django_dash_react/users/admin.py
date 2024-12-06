from django.contrib import admin
from .models import UserProfile
from django.contrib.auth.admin import UserAdmin

class UserProfileAdmin(UserAdmin):
    model = UserProfile
    list_display = ('email', 'full_name', 'role', 'is_active', 'is_staff')  # Eliminar 'date_joined'
    list_filter = ('is_active', 'is_staff', 'role')  # Filtros disponibles
    search_fields = ('email', 'full_name', 'role')
    ordering = ('-last_login',)  # Usar 'last_login' en lugar de 'date_joined'

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Información personal', {'fields': ('full_name', 'phone', 'role')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Fechas', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {'fields': ('email', 'username', 'password1', 'password2')}),
        ('Información personal', {'fields': ('full_name', 'phone', 'role')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

admin.site.register(UserProfile, UserProfileAdmin)


