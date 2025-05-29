from django.urls import path
from .views import RegisterView, LoginView, ListaRestaurantesView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('lista/', ListaRestaurantesView.as_view(), name='lista_restaurantes'),
]
