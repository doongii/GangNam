from django.db import models

class Reserva(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    fecha = models.DateField()
    hora = models.TimeField()
    num_personas = models.IntegerField()
    comentarios = models.TextField(blank=True, null=True)
    creada_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.fecha} {self.hora}"
