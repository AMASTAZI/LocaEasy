
from django.urls import path
from .import views


urlpatterns = [
    path('dashboard_admin/',views.dashboard_admin,name="dashboard_admin"),
    path('profil_admin/',views.profil_admin,name="profil_admin")
    
   
]