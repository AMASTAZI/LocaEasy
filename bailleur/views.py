from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.contrib.auth.decorators import login_required


from bd.models import Property


# Create your views here.


@login_required(login_url="login_user")
def page_bailleur(request):
    return render(request,'page_bailleur/bailleur.html')


@login_required(login_url="login_user")
def page_profil_bailleur(request):
    return render(request,'page_bailleur/profil_bailleur.html')


@login_required(login_url="login_user")
def page_gerer_propriete(request):
    # Récupérer toutes les propriétés de la base de données
    properties = Property.objects.all()

    # Passer les propriétés à la page HTML
    return render(request, 'page_bailleur/gerer_proprieter.html', {'properties': properties})


@login_required(login_url="login_user")
def add_property(request):
    if request.method == 'POST':
        try:
            # Récupérer les données envoyées dans le formulaire
            title = request.POST.get('propertyTitle')
            address = request.POST.get('propertyAddress')
            city = request.POST.get('propertyCity')
            postal_code = request.POST.get('propertyPostalCode')
            property_type = request.POST.get('propertyType')
            rooms = request.POST.get('propertyRooms')
            bedrooms = request.POST.get('propertyBedrooms')
            bathrooms = request.POST.get('propertyBathrooms')
            surface = request.POST.get('propertySurface')
            price = request.POST.get('propertyPrice')
            description = request.POST.get('propertyDescription')
            image = request.FILES.get('propertyImage')

            # Créer et sauvegarder l'objet Property dans la base de données
            property = Property(
                title=title,
                address=address,
                city=city,
                postal_code=postal_code,
                property_type=property_type,
                rooms=rooms,
                bedrooms=bedrooms,
                bathrooms=bathrooms,
                surface=surface,
                price=price,
                description=description,
                image=image
            )
            property.save()

            # Ajouter un message de succès pour l'utilisateur
            messages.success(request, 'Propriété ajoutée avec succès!')

        except Exception as e:
            # Ajouter un message d'erreur en cas d'exception
            messages.error(request, f'Une erreur est survenue : {str(e)}')

        # Rediriger l'utilisateur vers la page d'ajout de propriété
        return redirect('add_property')

    # Rendre la page de formulaire d'ajout de propriété
    return render(request, 'page_bailleur/gerer_proprieter.html')


@login_required(login_url="login_user")
def delete_property(request, property_id):
    # Récupérer la propriété à supprimer
    property = get_object_or_404(Property, id=property_id)
    
    # Supprimer la propriété
    property.delete()
    
    messages.success(request,'suppression reussie')

    # Rediriger vers la page de gestion des propriétés
    return redirect('gerer_proprieter')  # Assure-toi d'avoir une URL pour la liste des propriétés



@login_required(login_url="login_user")
def edit_property(request, property_id):
    property = get_object_or_404(Property, id=property_id)

    if request.method == 'POST':
        # Mise à jour des attributs de la propriété avec les données soumises
        property.title = request.POST.get('propertyTitle', property.title)
        property.address = request.POST.get('propertyAddress', property.address)
        property.city = request.POST.get('propertyCity', property.city)
        property.postal_code = request.POST.get('propertyPostalCode', property.postal_code)
        property.property_type = request.POST.get('propertyType', property.property_type)
        property.rooms = request.POST.get('propertyRooms', property.rooms)
        property.bedrooms = request.POST.get('propertyBedrooms', property.bedrooms)
        property.bathrooms = request.POST.get('propertyBathrooms', property.bathrooms)
        property.surface = request.POST.get('propertySurface', property.surface)
        property.price = request.POST.get('propertyPrice', property.price)
        property.description = request.POST.get('propertyDescription', property.description)
        
        # Gérer l'image si elle a été modifiée
        if 'propertyImage' in request.FILES:
            property.image = request.FILES['propertyImage']
        
        # Sauvegarde de la propriété modifiée
        property.save()
        
        # Message de succès
        messages.success(request, 'Modification réussie')

        # Redirection vers la page de gestion des propriétés (peut être modifiée en fonction de votre logique)
        return redirect('gerer_proprieter')

    # Si la méthode n'est pas POST, on renvoie la page d'édition avec les données actuelles de la propriété
    return render(request, 'page_bailleur/gerer_proprieter.html', {'property': property})



def get_property(request, property_id):
    # Récupérer la propriété par son ID
    property = get_object_or_404(Property, id=property_id)
    
    # Créer un dictionnaire avec les informations de la propriété
    property_data = {
        'title': property.title,
        'address': property.address,
        'city': property.city,
        'postal_code': property.postal_code,
        'property_type': property.property_type,
        'rooms': property.rooms,
        'bedrooms': property.bedrooms,
        'bathrooms': property.bathrooms,
        'surface': property.surface,
        'price': str(property.price),  # Convertir en string pour JSON
        'description': property.description,
        'image_url': property.image.url if property.image else None,  # Gérer l'absence d'image
    }
    
    # Retourner les données de la propriété sous forme de JSON
    return JsonResponse(property_data)



@login_required(login_url="login_user")
def profile_view(request):
    user = request.user

    # Si la requête est de type POST (soumission du formulaire)
    if request.method == 'POST':
        # Récupérer les données du formulaire
        first_name = request.POST.get('firstName')
        last_name = request.POST.get('lastName')
        email = request.POST.get('email')
        telephone = request.POST.get('phone')
        password = request.POST.get('password')  # Nouveau mot de passe

        # Mise à jour des informations de l'utilisateur
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.telephone = telephone

        # Si un mot de passe a été saisi, mettre à jour le mot de passe
        if password:
            user.set_password(password)

        # Enregistrer les modifications dans la base de données
        user.save()

        # Rediriger l'utilisateur après la mise à jour
        return redirect('profile')  # Remplacez 'profile' par l'URL appropriée

    else:
        # Si c'est une requête GET, afficher les informations actuelles
        return render(request, 'page_bailleur/profil_bailleur.html', {'user': user})