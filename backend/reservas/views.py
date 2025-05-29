from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import ConfiguracionReserva, ExcepcionDisponibilidad
from .serializers import ReservaSerializer, ConfiguracionReservaSerializer
from django.contrib.auth import get_user_model
import datetime
from .models import Reserva

User = get_user_model()

# 📌 1. Crear reserva
class CrearReservaView(APIView):
    def post(self, request):
        restaurante_id = request.data.get('restaurante')
        try:
            restaurante = User.objects.get(id=restaurante_id)
        except User.DoesNotExist:
            return Response({'error': 'Restaurante inválido'}, status=400)

        serializer = ReservaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(restaurante=restaurante)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 📌 2. Configuración privada (solo del dueño del restaurante)
class ConfiguracionReservaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        restaurante = request.user
        try:
            config = ConfiguracionReserva.objects.get(restaurante=restaurante)
        except ConfiguracionReserva.DoesNotExist:
            config = ConfiguracionReserva(restaurante=restaurante)
            config.save()
        serializer = ConfiguracionReservaSerializer(config)
        return Response(serializer.data)

    def put(self, request):
        restaurante = request.user
        try:
            config = ConfiguracionReserva.objects.get(restaurante=restaurante)
        except ConfiguracionReserva.DoesNotExist:
            config = ConfiguracionReserva(restaurante=restaurante)

        serializer = ConfiguracionReservaSerializer(config, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 📌 3. Fechas cerradas (actualizar días no disponibles)
class ActualizarFechasCerradasView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        fechas = request.data.get('fechas_cerradas', [])
        user = request.user

        # Borrar anteriores
        ExcepcionDisponibilidad.objects.filter(restaurante=user).delete()

        # Agregar nuevas
        for fecha_str in fechas:
            try:
                fecha = datetime.datetime.strptime(fecha_str, "%Y-%m-%d").date()
                ExcepcionDisponibilidad.objects.create(restaurante=user, fecha=fecha, cerrado=True)
            except ValueError:
                continue

        return Response({"mensaje": "Fechas cerradas actualizadas."})

# 📌 4. Configuración pública (solo lectura)
class ConfiguracionPublicaView(APIView):

    def get(self, request):
        restaurante_id = request.query_params.get('restaurante_id')
        if not restaurante_id:
            return Response({'error': 'restaurante_id es requerido'}, status=400)

        try:
            config = ConfiguracionReserva.objects.get(restaurante__id=restaurante_id)
        except ConfiguracionReserva.DoesNotExist:
            return Response({'error': 'No hay configuración para este restaurante'}, status=404)

        serializer = ConfiguracionReservaSerializer(config)
        return Response(serializer.data)


class ListaReservasRestauranteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        restaurante = request.user
        reservas = Reserva.objects.filter(restaurante=restaurante).order_by('-fecha', '-hora')
        serializer = ReservaSerializer(reservas, many=True)
        return Response(serializer.data)
    

class FechasNoDisponiblesView(APIView):
    def get(self, request):
        restaurante_id = request.query_params.get('restaurante_id')
        if not restaurante_id:
            return Response({'error': 'restaurante_id es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        fechas = ExcepcionDisponibilidad.objects.filter(
            restaurante__id=restaurante_id,
            cerrado=True
        ).values_list('fecha', flat=True)

        return Response(fechas)