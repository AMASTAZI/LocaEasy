from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def accueil(request):
    return render(request,'page_visiteur/accueil.html')

def inscription(request):
    return render(request,'page_visiteur/inscription.html')

def login_user(request):
    return render(request,'page_visiteur/login.html')
