from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings  # Para acceder al modelo de usuario

class Reserva(models.Model):
    restaurante = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Referencia al modelo de usuario (RestaurantUser)
        on_delete=models.CASCADE,
        related_name='reservas'
    )
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    telefono = models.CharField(max_length=15)
    fecha = models.DateField()
    hora = models.TimeField()
    num_personas = models.IntegerField()
    comentarios = models.TextField(blank=True, null=True)
    creada_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.fecha} {self.hora} ({self.restaurante})"


User = get_user_model()

class ConfiguracionReserva(models.Model):
    restaurante = models.OneToOneField(User, on_delete=models.CASCADE)
    
    hora_inicio_1 = models.TimeField()
    hora_fin_1 = models.TimeField()
    hora_inicio_2 = models.TimeField(null=True, blank=True)
    hora_fin_2 = models.TimeField(null=True, blank=True)
    
    intervalo = models.PositiveIntegerField(default=15)  # en minutos
    min_personas = models.PositiveIntegerField(default=1)
    max_personas = models.PositiveIntegerField(default=10)
    max_personas_por_periodo = models.PositiveIntegerField(default=20)

    def __str__(self):
        return f"Configuración de {self.restaurante.username}"

class ExcepcionDisponibilidad(models.Model):
    restaurante = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateField()
    cerrado = models.BooleanField(default=True)

    class Meta:
        unique_together = ['restaurante', 'fecha']

    def __str__(self):
        return f"{self.restaurante.username} - {self.fecha} - {'CERRADO' if self.cerrado else 'ABIERTO'}"
