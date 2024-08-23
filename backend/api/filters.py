import django_filters
from .models import Ronda, Employee, Event
from django.db.models.functions import ExtractMonth, ExtractDay, ExtractYear
from django import forms

class EventFilter(django_filters.FilterSet):
    #range  = django_filters.DateRangeFilter
    monthly = django_filters.NumberFilter(field_name='uploaded_at',method='filter_by_month', label='By Month')
    
    def filter_by_month(self, queryset, name, value):
        return queryset.annotate(month = ExtractMonth('uploaded_at')).filter(month=value)
      
      
    class Meta:
        model : Event
        fields = ['monthly']


class RondaFilter(django_filters.FilterSet):
    employee = django_filters.ModelChoiceFilter(queryset=Employee.objects.all())
    # employee = django_filters.ModelMultipleChoiceFilter(
    #     queryset = Employee.objects.all(),
    #     widget = forms.CheckboxSelectMultiple()
    # )
    monthly = django_filters.CharFilter(method='filter_by_month_year', label='By Month and Year')
    day = django_filters.NumberFilter(field_name='date_created',method='filter_by_day', label='By Day')
    date_range = django_filters.DateFromToRangeFilter(field_name='date_created', label='Date Range')
    
    def filter_by_day(self, queryset, name, value):
        return queryset.annotate(day = ExtractDay('date_created')).filter(day=value)
    
    def filter_by_month_year(self, queryset, name, value):
        try:
            month, year = value.split('-')
            queryset = queryset.annotate(month=ExtractMonth('date_created'), year=ExtractYear('date_created'))
            return queryset.filter(month=month, year=year)
        except ValueError:
            return queryset
    class Meta:
        model : Ronda
        fields = ['monthly', 'employee','day','range_dates']

class EmployeeFilter(django_filters.FilterSet):
        firstname  = django_filters.CharFilter()
        
        class Meta:
            model = Employee
            fields = {'firstname':['icontains'],
                      'lastname':['icontains'],
                      'ci':['exact']
                      }