from django.shortcuts import get_object_or_404, redirect, render
from bd.models import Property, Reservation, Utilisateur
from django.contrib import messages
from django.contrib.auth.hashers import make_password


# Create your views here.




def dashboard_admin(request):
    # Fetch the counts for users, reports, properties, and reservations
    users_count = Utilisateur.objects.count()
    user = Utilisateur.objects.all()
    properties_count = Property.objects.count()  # Assuming you have a Property model
    active_reservations_count = Reservation.objects.filter(status='active').count()  # Assuming active reservations have a specific status

    # Render the dashboard page with the necessary data
    return render(request, 'page_admin/dashboard_admin.html', {
        'users_count': users_count,
        'properties_count': properties_count,
        'active_reservations_count': active_reservations_count,
        'utilisateur': user
    })
    
def profil_admin(request):
    return render(request,'page_admin/profil_admin.html')

from django.utils.text import slugify  # To generate a slug (unique username)

def add_user(request):
    if request.method == 'POST':
        # Get form data
        first_name = request.POST.get('firstName')
        last_name = request.POST.get('lastName')
        email = request.POST.get('email')
        telephone = request.POST.get('phoneNumber')
        role = request.POST.get('role')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirmPassword')

        # Validate required fields
        if not first_name or not last_name or not email or not telephone or not role or not password or not confirm_password:
            messages.error(request, "Tous les champs sont obligatoires.")
            return render(request, 'page_admin/add_user.html')

        # Check if passwords match
        if password != confirm_password:
            messages.error(request, "Les mots de passe ne correspondent pas.")
            return render(request, 'page_admin/add_user.html')

        # Check if email already exists
        if Utilisateur.objects.filter(email=email).exists():
            messages.error(request, "Cet email est déjà utilisé.")
            return render(request, 'page_admin/add_user.html')

        # Generate a unique username if not provided
        username = slugify(f"{first_name}{last_name}")
        
        # Check if the username already exists and create a unique one
        if Utilisateur.objects.filter(username=username).exists():
            username = f"{username}{Utilisateur.objects.count()}"

        # Hash the password
        hashed_password = make_password(password)

        # Create and save the user
        user = Utilisateur(
            first_name=first_name,
            last_name=last_name,
            email=email,
            telephone=telephone,
            role=role,
            password=hashed_password,
            username=username  # Assign the generated or provided username
        )
        user.save()

        # Success message
        messages.success(request, "Utilisateur ajouté avec succès!")
        return redirect('dashboard_admin')  # Redirect to a user list page or wherever you prefer

    return render(request, 'page_admin/add_user.html')


def delete_user(request, user_id):
    user = get_object_or_404(Utilisateur, id=user_id)
    
    # Check if the user is an admin, prevent deleting an admin user (optional)
    if user.role == 'ADMIN':
        messages.error(request, "Vous ne pouvez pas supprimer un administrateur.")
    else:
        user.delete()
        messages.success(request, "Utilisateur supprimé avec succès.")
    
    return redirect('dashboard_admin')  # Redirect back to the dashboard



def deactivate_user(request, user_id):
    user = get_object_or_404(Utilisateur, id=user_id)
    
    if user.is_active:
        user.is_active = False
        user.save()
        messages.success(request, "Utilisateur désactivé avec succès.")
    else:
        messages.error(request, "Cet utilisateur est déjà inactif.")
    
    return redirect('dashboard_admin')  # Redirect back to the dashboard



def activate_user(request, user_id):
    user = get_object_or_404(Utilisateur, id=user_id)
    
    if not user.is_active:
        user.is_active = True
        user.save()
        messages.success(request, "Utilisateur activé avec succès.")
    else:
        messages.error(request, "Cet utilisateur est déjà actif.")
    
    return redirect('dashboard_admin')  # Redirect back to the dashboard




def edit_profile(request):
    user = request.user  # Assuming the user is logged in

    if request.method == 'POST':
        # Get the form data from the POST request
        first_name = request.POST.get('editFirstName')
        last_name = request.POST.get('editLastName')
        email = request.POST.get('editEmail')
        phone = request.POST.get('editPhone')
        role = request.POST.get('editRole')

        # Update the user instance with the new data
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.telephone = phone
        user.role = role
        
        # Save the updated user instance
        user.save()

        # Show a success message
        messages.success(request, "Votre profil a été mis à jour avec succès.")

        return redirect('profil_admin')  # Redirect to the user's profile page

    # Render the edit profile form pre-filled with the current user data
    return render(request, 'page_admin/profil_admin.html', {
        'user': user
    })