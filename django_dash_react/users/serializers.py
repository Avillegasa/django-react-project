from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'password', 'phone', 'full_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserProfile.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data.get('phone', ''),
            full_name=validated_data.get('full_name', '')
        )
        return user
        
    # def validate_email(self, value):
    #     if UserProfile.objects.filter(email=value).exists():
    #         raise serializers.ValidationError("Este correo electrónico ya está en uso.")
    #     return value