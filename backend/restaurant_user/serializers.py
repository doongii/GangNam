from rest_framework import serializers
from .models import RestaurantUser
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantUser
        fields = ['username', 'password', 'email', 'nombre_restaurante']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = RestaurantUser.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Credenciales inválidas")
