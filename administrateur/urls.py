
from django.urls import path
from .import views


urlpatterns = [
    path('dashboard_admin/',views.dashboard_admin,name="dashboard_admin")
    
   
]