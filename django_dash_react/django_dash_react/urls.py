from django.contrib import admin
from django.urls import path, include
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),  # Rutas de API para el módulo de usuarios
    path('api/comisos/', include('comisos.urls')),  # Rutas de API para el módulo de incautaciones
    path('', views.index, name='index'),
    path('api/', include('comisos.urls')),  # Incluye las rutas de 'comisos'
]
