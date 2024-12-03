"""
Django settings for django_dash_react project.

Generated by 'django-admin startproject' using Django 5.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-_&-xu%sp&zj+sr)cpnuy7-6t#rzbr4cql5az4r@w4wi4qzji2('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

AUTH_USER_MODEL = 'users.UserProfile'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'users',
    'comisos',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
    

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173", #Puerto donde corre React
]
CORS_ALLOW_CREDENTIALS = True

# Asegúrate de que estas configuraciones estén presentes
CSRF_COOKIE_NAME = 'csrftoken'  # Nombre de la cookie
CSRF_COOKIE_HTTPONLY = False   # Debe ser False para permitir el acceso desde JavaScript
CSRF_COOKIE_SECURE = False     # Debe ser False en desarrollo (en producción, ponlo en True si usas HTTPS)
CSRF_COOKIE_SAMESITE = 'Lax'       # Ayuda a prevenir fugas de cookies
CSRF_HEADER_NAME = 'HTTP_X_CSRFTOKEN'  # Nombre del encabezado para CSRF
CSRF_TRUSTED_ORIGINS = [
    'https://localhost:5173',
]


CORS_ALLOWED_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False

ROOT_URLCONF = 'django_dash_react.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'django_dash_react', 'templates')], # Apunta a la carpeta templates
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_dash_react.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_dash_db',
        'USER': 'avillegas',
        'PASSWORD': 'Avillegasa@123',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}



# Password validationgit checkout Icondoric
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']



# Esto le indica a Django que busque los archivos estaticos en el directorio donde se construyen los archivos de Vite

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


#Agregamos la conexion de corsheaders para react en este proyecto de Django


# Inicializacion del Schema
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
