from django.urls import path
from .views import crear_reserva
from .views import configuracion_reserva
from .views import actualizar_fechas_cerradas

urlpatterns = [
    path('reservas/', crear_reserva, name='crear_reserva'),
    path('configuracion/', configuracion_reserva),
    path('configuracion/fechas_cerradas/', actualizar_fechas_cerradas),
]
