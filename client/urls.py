
from django.urls import path
from .import views


urlpatterns = [
    path('page_client/',views.page_client,name="page_client"),
    path('dashboard_client/',views.dashboard_client,name="dashboard_client"),
    path('formulaire_reservation/<int:property_id>/',views.formulaire_reservation,name="formulaire_reservation"),
    path('contrat_de_bail/<int:reservation_id>/', views.contrat_de_bail, name='contrat_de_bail'),
    path('reservation/<int:property_id>/', views.reservation_form, name='reservation_form'),
    path('signature/', views.contract_signature, name='contract_signature'),
    path('profile/', views.manage_profile, name='manage_profile'),



    
   
]