
from django.urls import path,include

from .import views


urlpatterns = [
    path('',views.accueil, name='accueil'),
    path('inscription-utilisateur/',views.inscription,name='inscription_utilisateur'),
    path('login-user/',views.login_user,name="login_user")
   
]