# Django - React Project 

Este proyecto es una aplicación web construida con **Django** como backend y **React** (usando Vite) como frontend. **PostgreSQL** se usa como base de datos y se configura **Firebase** para notificaciones.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- **Python 3.12+**
- **Node.js 14+** y **npm version 10.8.3 (actualizar si lo tienes desactualizado)**
- **PostgreSQL**
- **Git**

## Configuración del Proyecto

Sigue estos pasos para clonar el repositorio, instalar dependencias y ejecutar el proyecto.
# Paso 0: 
## Crear la carpeta del proyecto
Navega al directorio donde quieres almacenar el proyecto y crea una carpeta llamada django_dash:
```
mkdir django_dash
cd django_dash
```

# Paso 1: Clonar el Repositorio

## Para los desarrolladores (importante! --> Crear su propia rama (preferiblemente con solo su nombre y realizar el pull que corresponde)

## PARA NADA DEBEN TOCAR EL MAIN, SOLO PARA EL PULL 

```bash
git clone https://github.com/tu_usuario/django-react-project.git
cd django-react-project
git checkout main
```

# Paso 2: (Configuracion del Backend - Django )

## Crear un entorno virtual:

Navega al directorio principal del proyecto y crea un entorno virtual 

```
python3 -m venv env
source env/bin/activate  # Para Linux/macOS
```

## Instalar las dependencias de Python 

Dentro del entorno virtual, instala las dependencias de Django y otros paquetes necesarios:
```
pip install django
```
### Crear el proyecto Django

Con Django instalado, crea un nuevo proyecto llamado django_dash_react:
```
django-admin startproject django_dash_react .
```
Esto generará el archivo manage.py y la estructura básica de Django dentro de django_dash.

## Instalar dependencias adicionales de Python
Instala dependencias adicionales (como djangorestframework, psycopg2 para PostgreSQL, y django-cors-headers):
```
pip install djangorestframework psycopg2 django-cors-headers
```
### Configurar Postgresql (Este paso aun puede ser eliminado o modificado ya que se optara por Mysql pero por ahora realizarlo porseacaso)

Inicia PostgreSQL y crea un usuario y una base de datos para el proyecto:
```
CREATE USER django_user WITH PASSWORD 'securepassword';
CREATE DATABASE django_dash_db OWNER django_user;
ALTER ROLE django_user SET client_encoding TO 'utf8';
ALTER ROLE django_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE django_user SET timezone TO 'UTC';
```

## Configurar la base de datos en python

En el archivo django_dash_react/settings.py, configura la base de datos  para usar PostgreSQL:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'django_dash_db', #Nombre del proyecto
        'USER': 'django_user',
        'PASSWORD': 'securepassword',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Configurar CORS Headers: 

En settings.py, añade corsheaders a las aplicaciones instaladas y configura los encabezados CORS para permitir que el frontend de React se comunique con Django:
```
INSTALLED_APPS = [
    ...,
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...,
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Permite la URL donde se ejecutará React
]
```

### Realizar migraciones adicionales

Ejecuta las migraciones para crear las tablas de la base de datos:
```
python manage.py migrate
```

# Paso 3: Configuracion del Frontend (React con Vite)

## Crear el proyecto de React vite

Desde la carpeta raíz django_dash, crea la aplicación de frontend dentro de una carpeta frontend:
```
npm create vite@latest frontend --template react
cd frontend
```

### Una vez dentro de la carpeta frontend, instala las dependencias necesarias:

```
npm install
```

## Configurar la carpeta de usuario  

En el archivo vite.config.js, configura la carpeta de salida para que los archivos compilados de producción se guarden en el directorio estático de Django (../django_dash_react/static):
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../django_dash_react/static',  // Carpeta de salida para Django
  },
})
```
## Compilar el proyecto de react
Compila el proyecto de React para producción. Esto generará los archivos en la carpeta static dentro de django_dash_react:
```
npm run build
```
# Paso 4: Configurar Django para Servir el Archivo 'index.html'

## Mover el archivo 'index.html' a la carpeta de plantillas

Copia el archivo index.html de static a una nueva carpeta templates en django_dash_react:

```
mkdir -p ../django_dash_react/templates
cp ../django_dash_react/static/index.html ../django_dash_react/templates/
```
## Actualizar la Vista en Django para Cargar 'index.html'
Crea una vista en django_dash_react/views.py que cargue 'index.html':

```
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')
```

## Configurar URL de Django para renderizar el Frontend
En django_dash_react/urls.py, configura la URL para cargar el frontend:
```
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```
# Paso 5: Ejecutar el proyecto

## Iniciar el Servidor de Django 

Desde la carpeta raíz del proyecto, inicia el servidor de Django:
```
python manage.py runserver
```
## Iniciar el servidor de desarrollo de React 

Si necesitas realizar cambios en el frontend y probar en desarrollo, inicia el servidor de desarrollo de React en una terminal separada:
```
cd frontend
npm run dev
```
Esto abrirá el frontend en http://localhost:3000.

### Configuración de Variables de Entorno

Es posible que necesites un archivo `.env` para almacenar variables sensibles. Asegúrate de añadir el archivo `.env` a `.gitignore`.

El gitignore deberia verse de la siguiente manera:
```
# Entorno virtual
env/

#Archivos de configuracion de sistema operativo
*.DS_Store

#Archivos de compilacion de Vite 
node_modules/

#archivos de configuracion sensible
*.env
__pycache__/
```

# Notas adicionales
```
- **Rama Principal**: Todos los colaboradores deben trabajar en ramas derivadas de `main` y hacer `pull requests`.
```
### Es decir, nuevamente se repite que todos deben crear su branch y trabajar en la misma el main solo es para la guia de integracion, es decir la guia actual

# Estructura de carpetas

## Asi es como deberia verse
```
django_dash/
├── django_dash_react/
│   ├── templates/
│   │   └── index.html            # Plantilla principal de React
│   ├── static/                   # Archivos estáticos de React (compilados)
│   ├── settings.py               # Configuración de Django
│   ├── urls.py                   # Configuración de URLs de Django
│   └── views.py                  # Vistas de Django
├── manage.py                     # Script de administración de Django
└── frontend/                     # Proyecto de React con Vite
    ├── src/                      # Código fuente de React
    ├── public/
    ├── package.json
    └── vite.config.js            # Configuración de Vite
```

# Comandos rapidos 
### Iniciar el entorno virtual 
```
source /env/bin/activate
```
### Instalar dependencias de Python  
```
pip install -r requirements.txt
```
## Iniciar el servidor de Django

```
python manage.py runserver
```

## Compilar el frontend para produccion en Django
```
npm run build
```
