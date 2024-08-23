from django.urls import path, include
from .views import *
from rest_framework import routers


urlpatterns = [
    path('rutas/', RutaListAPIView.as_view(), name='rutas'),
    path('rutas/<int:ruta_id>/tramos', TramosByRutaAPIView.as_view(), name='tramos-by-ruta'),
    path('employees/', EmployeeAPIView.as_view()),
    path('rondas/', RondaListCreateAPIView.as_view(), name='ronda-create'),
    path('rondas/<int:id>/', RondaRetrieveUpdateDeleteAPIView.as_view(), name='ronda-detail'),
    path('events/', EventView.as_view(), name='events'),
    
]
