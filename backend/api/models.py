from django.db import models
from django.utils import timezone

class Ruta(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Employee(models.Model):
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    ci = models.CharField(max_length=10)
    @property
    def fullname(self):
        return f"{self.firstname} {self.lastname}"
    def __str__(self):
        return f"{self.firstname} {self.lastname}"


class Tramo(models.Model):
    name = models.CharField(max_length=50)
    ruta = models.ForeignKey(Ruta, related_name='tramos', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Ronda(models.Model):
    ruta = models.ForeignKey(Ruta, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)
    date_finished = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return f"Ronda {self.id} for {self.ruta.name}"


class Event(models.Model):
    tramo = models.ForeignKey(Tramo, on_delete=models.CASCADE)
    ronda = models.ForeignKey(Ronda, related_name='events', on_delete=models.CASCADE)
    title = models.CharField(max_length=60, default="")
    event_image = models.ImageField(null=True, upload_to="images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


