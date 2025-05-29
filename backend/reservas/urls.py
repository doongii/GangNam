from django.urls import path
from .views import (
    CrearReservaView,
    ConfiguracionReservaView,
    ActualizarFechasCerradasView,
    ConfiguracionPublicaView,
    ListaReservasRestauranteView,
    FechasNoDisponiblesView
)

urlpatterns = [
    path('confirmar/', CrearReservaView.as_view(), name='crear_reserva'),
    path('configuracion/', ConfiguracionReservaView.as_view()),
    path('configuracion/fechas_cerradas/', ActualizarFechasCerradasView.as_view()),
    path('configuracion/publica/', ConfiguracionPublicaView.as_view()),
    path('mis-reservas/', ListaReservasRestauranteView.as_view(), name='mis_reservas'),
    path('fechas-no-disponibles/', FechasNoDisponiblesView.as_view(), name='fechas-no-disponibles'),
]
