from django.shortcuts import render

# Create your views here.


def page_bailleur(request):
    return render(request,'page_bailleur/bailleur.html')


def page_profil_bailleur(request):
    return render(request,'page_bailleur/profil_bailleur.html')


def page_gerer_propriete(request):
    return render(request,'page_bailleur/gerer_proprieter.html')

