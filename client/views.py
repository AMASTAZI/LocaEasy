from django.shortcuts import render

# Create your views here.



def page_client(request):
    return render(request,'page_client/page_client.html')

def dashboard_client(request):
    return render(request,'page_client/dashboard_client.html')

def formulaire_reservation(request):
    return render(request,'page_client/formulaire_reservation.html')

def contrat_de_bail(request):
    return render(request,'page_client/contrat_de_bail.html')

