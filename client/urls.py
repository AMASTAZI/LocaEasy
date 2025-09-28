
from django.urls import path
from .import views


urlpatterns = [
    path('page_client/',views.page_client,name="page_client"),
    path('dashboard_client/',views.dashboard_client,name="dashboard_client"),
    path('formulaire_reservation/',views.formulaire_reservation,name="formulaire_reservation"),
    path('contrat_de_bail/',views.contrat_de_bail,name="contrat_de_bail")
    
   
]