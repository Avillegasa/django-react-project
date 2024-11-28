from django.contrib import admin
from django.urls import path, include
from django.urls import path
from . import views
from .views import api_root

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),  # Rutas de API para el módulo de usuarios
    path('api/comisos/', include('comisos.urls')),  # Rutas de API para el módulo de incautaciones
    path('api/', api_root),  # Mantén esta línea si deseas DRF en 'api/'
]

