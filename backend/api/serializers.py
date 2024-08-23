from rest_framework import serializers
from .models import *

##
class EmployeeSerializer(serializers.ModelSerializer):
    fullname = serializers.ReadOnlyField()
    class Meta:
        model = Employee
        fields = ['id','firstname', 'lastname', 'ci', 'fullname']
        
        
class RutaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ruta
        fields = ['id', 'name']  


class EventSerializer(serializers.ModelSerializer):
    tramoId = serializers.PrimaryKeyRelatedField(source='tramo', queryset=Tramo.objects.all())
    rondaId = serializers.PrimaryKeyRelatedField(source='ronda', queryset=Ronda.objects.all())
    uploaded_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Event
        fields = ['title', 'uploaded_at', 'tramoId', 'event_image','rondaId']

        
        
class RondaSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True) 
    ruta = RutaSerializer( read_only=True)
    employee = EmployeeSerializer(read_only=True)
    rutaId = serializers.PrimaryKeyRelatedField(source='ruta', queryset=Ruta.objects.all(), write_only=True)
    employeeId = serializers.PrimaryKeyRelatedField(source='employee', queryset=Employee.objects.all() ,write_only=True)
    date_finished = serializers.DateTimeField(required=False, allow_null= True)
    class Meta:
        model = Ronda
        fields = ['id','ruta', 'employee', 'date_created', 'date_finished', 'events','rutaId','employeeId']

    def create(self, validated_data):
        events_data = validated_data.pop('events',[])
        ronda = Ronda.objects.create(**validated_data)
        ronda.events.set(events_data)
        return ronda


class TramoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tramo
        fields = ['id', 'name']
        


