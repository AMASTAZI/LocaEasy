from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages

from bd.models import Property, Reservation
from django.contrib.auth.decorators import login_required


# Create your views here.


@login_required(login_url="login_user")
def page_client(request):
    property = Property.objects.all()
    context = {
        'properties': property
    }
    return render(request,'page_client/page_client.html',context)

@login_required(login_url="login_user")
def dashboard_client(request):
    # Récupère les réservations liées à l'utilisateur connecté
    reservations = Reservation.objects.filter(user=request.user)
    
    return render(request, 'page_client/dashboard_client.html', {'reservations': reservations})


@login_required(login_url="login_user")
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


@login_required(login_url="login_user")
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
            message=message,
            user=request.user  # Associate the reservation with the logged-in user

        )
        reservation.save()

        # Afficher un message de confirmation
        messages.success(request, "Réservation confirmée avec succès!")

        return redirect('contrat_de_bail', reservation_id=reservation.id)

    return render(request, 'page_client/formulaire_reservation.html', {'property': property})


@login_required(login_url="login_user")
def contract_signature(request):
    if request.method == 'POST':
        # Vérification de la présence des données envoyées
        contract_date = request.POST.get('contract_date')
        tenant_name = request.POST.get('tenant_name')
        signature = request.POST.get('signature')

        # Affichage dans la console pour vérifier ce qui est reçu
        print(f"Contract Date: {contract_date}")
        print(f"Tenant Name: {tenant_name}")
        print(f"Signature: {signature}")

        if contract_date and tenant_name and signature:
            # Si tout est correct, tu peux continuer avec l'enregistrement de ces données
            # Par exemple : Contract.objects.create(date=contract_date, tenant_name=tenant_name, signature=signature)
            return JsonResponse({'status': 'success'})
        else:
            # Si des données sont manquantes, retourne une erreur
            return JsonResponse({'status': 'error', 'message': 'Données manquantes'}, status=400)
    else:
        return render(request, 'contract/contract_signature.html')
    
    
    
@login_required(login_url="login_user")
def manage_profile(request):
    if request.method == 'POST':
        # Get the current user
        user = request.user

        # Update the user's profile with the form data
        user.first_name = request.POST.get('first-name')
        user.last_name = request.POST.get('last-name')
        user.email = request.POST.get('email')
        user.telephone = request.POST.get('phone')
        user.adresse = request.POST.get('address')
        user.date_of_birth = request.POST.get('birthdate')
        user.profession = request.POST.get('profession')

        # Save the updated user profile
        user.save()

        # Success message
        messages.success(request, "Vos informations ont été mises à jour avec succès.")
        return redirect('manage_profile')  # Redirect to the same page to see changes

    else:
        # If GET request, pre-populate the form with the current user's data
        user = request.user
        return render(request, 'page_client/dashboard_client.html', {
            'user': user
        })
