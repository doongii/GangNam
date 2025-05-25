from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ReservaSerializer
from .models import ConfiguracionReserva
from .models import ExcepcionDisponibilidad
from .serializers import ConfiguracionReservaSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
import datetime


@api_view(['POST'])
def crear_reserva(request):
    serializer = ReservaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def configuracion_reserva(request):
    restaurante = request.user

    try:
        config = ConfiguracionReserva.objects.get(restaurante=restaurante)
    except ConfiguracionReserva.DoesNotExist:
        config = ConfiguracionReserva(restaurante=restaurante)

    if request.method == 'GET':
        serializer = ConfiguracionReservaSerializer(config)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ConfiguracionReservaSerializer(config, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

    
User = get_user_model()

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_fechas_cerradas(request):
    fechas = request.data.get('fechas_cerradas', [])
    user = request.user

    # Eliminar anteriores
    ExcepcionDisponibilidad.objects.filter(restaurante=user).delete()

    # Agregar nuevas
    for fecha_str in fechas:
        try:
            fecha = datetime.datetime.strptime(fecha_str, "%Y-%m-%d").date()
            ExcepcionDisponibilidad.objects.create(restaurante=user, fecha=fecha, cerrado=True)
        except ValueError:
            continue  # Ignorar fechas mal formateadas

    return Response({"mensaje": "Fechas cerradas actualizadas."})