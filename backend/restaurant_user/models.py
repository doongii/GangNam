from django.contrib.auth.models import AbstractUser
from django.db import models

class RestaurantUser(AbstractUser):
    nombre_restaurante = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.TextField(blank=True)

    def __str__(self):
        return self.username
