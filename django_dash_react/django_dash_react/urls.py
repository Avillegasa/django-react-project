from django.contrib import admin
from django.urls import path, include
from users.views import RegisterUserView, LoginUserView

urlpatterns = [
    path('', LoginUserView.as_view(), name='login' ),
    path('admin/', admin.site.urls),
    path('api/users/register/', RegisterUserView.as_view(), name='register'),
    path('api/users/login', LoginUserView.as_view(), name='login'),
    # path('api/users/', include('users.urls')),

]
