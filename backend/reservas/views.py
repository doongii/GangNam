from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Reserva
from .serializers import ReservaSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
