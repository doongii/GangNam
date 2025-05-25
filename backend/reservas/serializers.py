from rest_framework import serializers
from .models import Reserva
from .models import ConfiguracionReserva

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'

class ConfiguracionReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionReserva
        fields = '__all__'