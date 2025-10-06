from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages

from bd.models import Property, Reservation

# Create your views here.



def page_client(request):
    property = Property.objects.all()
    context = {
        'properties': property
    }
    return render(request,'page_client/page_client.html',context)

def dashboard_client(request):
    return render(request,'page_client/dashboard_client.html')



def formulaire_reservation(request, property_id):
    # Récupérer la propriété à partir de l'ID dans l'URL
    property = get_object_or_404(Property, id=property_id)

    # Passer les détails de la propriété au template
    return render(request, 'page_client/formulaire_reservation.html', {'property': property})


def contrat_de_bail(request, reservation_id):
    # Récupérer la réservation par son ID
    reservation = get_object_or_404(Reservation, id=reservation_id)
    
    # Récupérer la propriété liée à cette réservation
    property = reservation.property  # Assumons que Reservation a un champ ForeignKey vers Property
    
    # Passer les informations de la réservation et de la propriété au template
    return render(request, 'page_client/contrat_de_bail.html', {'reservation': reservation, 'property': property})

def reservation_form(request, property_id):
    property = Property.objects.get(id=property_id)
    if request.method == 'POST':
        first_name = request.POST['first-name']
        last_name = request.POST['last-name']
        email = request.POST['email']
        phone = request.POST['phone']
        check_in = request.POST['check-in']
        check_out = request.POST['check-out']
        occupants = request.POST['occupants']
        message = request.POST.get('message', '')

        # Créer une nouvelle réservation
        reservation = Reservation(
            property=property,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            check_in=check_in,
            check_out=check_out,
            occupants=occupants,
            message=message
        )
        reservation.save()

        # Afficher un message de confirmation
        messages.success(request, "Réservation confirmée avec succès!")

        return redirect('contrat_de_bail', reservation_id=reservation.id)

    return render(request, 'page_client/formulaire_reservation.html', {'property': property})

