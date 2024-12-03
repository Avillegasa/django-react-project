from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile

class UserProfileAdminForm(UserCreationForm):
    class Meta:
        model = UserProfile
        fields = ('username', 'email', 'password1', 'password2', 'role')

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if not email:
            raise forms.ValidationError("Este campo no puede estar vacío")
        return email
