from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse



from bd.models import Property, Utilisateur

# Create your views here.
def accueil(request):
    property = Property.objects.all()
    context = {
        'properties':property
    }
    return render(request,'page_visiteur/accueil.html',context)

def inscription(request):
    if request.method == 'POST':
        nom = request.POST.get('nom', '').strip()
        prenom = request.POST.get('prenom', '').strip()
        adresse = request.POST.get('adresse', '').strip()
        age = request.POST.get('age', '').strip()
        telephone = request.POST.get('telephone', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm_password = request.POST.get('confirmPassword', '')
        conditions = request.POST.get('conditions')  # Vérifier si la case est cochée

        # Vérification des conditions générales
        if not conditions:
            messages.error(request, "Vous devez accepter les conditions générales.")
            return render(request, 'page_visiteur/inscription.html')

        # Vérification de la correspondance des mots de passe
        if password != confirm_password:
            messages.error(request, "Les mots de passe ne correspondent pas.")
            return render(request, 'page_visiteur/inscription.html')

        # Vérification si l'email existe déjà
        if Utilisateur.objects.filter(email=email).exists():
            messages.error(request, "Cette adresse e-mail est déjà utilisée.")
            return render(request, 'page_visiteur/inscription.html')

        # Vérification si le téléphone existe déjà
        if Utilisateur.objects.filter(telephone=telephone).exists():
            messages.error(request, "Ce numéro de téléphone est déjà utilisé.")
            return render(request, 'page_visiteur/inscription.html')

        # Création de l'utilisateur avec le rôle CLIENT par défaut
        user = Utilisateur(
            username=email,
            email=email,
            first_name=prenom,
            last_name=nom,
            telephone=telephone,
            adresse=adresse,
            role=Utilisateur.RoleUtilisateur.CLIENT  # Rôle par défaut
        )
        user.set_password(password)  # Hash automatique du mot de passe
        user.save()

        messages.success(request, "Inscription réussie. Vous pouvez maintenant vous connecter.")
        return redirect('login_user')  # Rediriger vers la page de connexion

    return render(request, 'page_visiteur/inscription.html')


def login_user(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        remember = request.POST.get('remember')  # récupère la case "Se souvenir de moi"

        try:
            # Authentification de l'utilisateur
            user = authenticate(username=email, password=password)

            if user is not None:
                # Récupération de l'utilisateur depuis la base de données
                utilisateur = get_object_or_404(Utilisateur, email=email)

                # Initialisation des sessions
                login(request, utilisateur)
                request.session["username"] = utilisateur.username
                request.session["email"] = utilisateur.email
                request.session["role"] = utilisateur.role  # Utilise 'role' au lieu de 'privilege'

                # Gestion de la durée de session
                if not remember:
                    request.session.set_expiry(0)  # expire quand navigateur fermé
                else:
                    request.session.set_expiry(1209600)  # 2 semaines

                # Redirection selon le rôle
                if utilisateur.role == Utilisateur.RoleUtilisateur.ADMIN:
                    return redirect("dashboard_admin")

                elif utilisateur.role == Utilisateur.RoleUtilisateur.BAILLEUR:
                    return redirect("page_bailleur")  # À définir dans vos URLs

                elif utilisateur.role == Utilisateur.RoleUtilisateur.CLIENT:
                    return redirect("page_client")  # À définir dans vos URLs

                else:
                    # Redirection par défaut si le rôle n'est pas reconnu
                    return redirect("accueil")

            else:
                messages.error(request, "Identifiants incorrects.")
                return render(request, "page_visiteur/login.html")

        except Utilisateur.DoesNotExist:
            messages.error(request, "Utilisateur introuvable.")
            return render(request, "page_visiteur/login.html")

        except Exception as e:
            print(f"Erreur lors de la connexion : {e}")
            messages.error(request, "Une erreur est survenue. Veuillez réessayer.")
            return render(request, "page_visiteur/login.html")

    # Si ce n'est pas une méthode POST
    return render(request, "page_visiteur/login.html")


def deconnexion(request):  # page de déconnexion
    # Récupérer l'utilisateur avant de détruire la session
    user = request.user  

    # Supprimer "username" de la session si présent
    request.session.pop("username", None)
    
    user.en_ligne = False

    # Déconnexion
    logout(request)
    
    messages.success(request,'deconnexion reussie')

    # Rediriger vers la page de login
    return redirect(reverse("login_user"))






