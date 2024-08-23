from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from django_filters.rest_framework import DjangoFilterBackend    
from .filters import *
import requests
from .pagination import SmallSetPagination


##
# Create your views here.
class EmployeeAPIView(ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EmployeeFilter
    
class RutaListAPIView(ListAPIView):
    queryset = Ruta.objects.all()
    serializer_class = RutaSerializer


class TramosByRutaAPIView(ListAPIView):
    serializer_class = TramoSerializer

    def get_queryset(self):
        ruta_id = self.kwargs['ruta_id']
        return Tramo.objects.filter(ruta_id=ruta_id)
        
    
class RondaListCreateAPIView(ListCreateAPIView):
    queryset = Ronda.objects.all().order_by("-id")
    pagination_class = SmallSetPagination
    serializer_class = RondaSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = RondaFilter   
    
    
class RondaRetrieveUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Ronda.objects.all()
    serializer_class = RondaSerializer
    lookup_field='id'
    
  
class EventView(ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    parser_classes=[MultiPartParser,FormParser]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EventFilter
    
    def perform_create(self, serializer):
        event = serializer.save()
        try:
            payload = {
               "to":"ExponentPushToken[6-v0xLJvzh6XZpEJcTculI]",
               "title":"Reporte Bitacora",
               "body":"Numero de secuencia: "+ str(event.ronda_id),
            }
            
            response = requests.post(
                "https://exp.host/--/api/v2/push/send",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            if(response.status_code != 200):
                print(f"Failed to send push notification: {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {str(e)}")
        return super().perform_create(serializer)
 
