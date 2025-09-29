
from django.urls import path
from .import views


urlpatterns = [
    path('page_bailleur/',views.page_bailleur,name="page_bailleur"),
    path('page_bailleur_profile/',views.page_profil_bailleur,name="page_bailleur_profile"),
    path('page_bailleur_gerer_proprieter/',views.page_gerer_propriete,name="gerer_proprieter")


    
   
]