from django.contrib import admin
from .models import UtilisateurManager,Utilisateur,Property

# Register your models here.

admin.site.register(Utilisateur)
admin.site.register(Property)
