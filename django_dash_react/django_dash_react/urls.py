from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),  # Rutas de API para el módulo de usuarios
    path('api/comisos/', include('comisos.urls')),  # Rutas de API para el módulo de incautaciones
]
