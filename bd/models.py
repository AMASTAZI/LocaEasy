from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone


class UtilisateurManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'utilisateur doit avoir un email")
        email = self.normalize_email(email)
        extra_fields.setdefault("role", Utilisateur.RoleUtilisateur.CLIENT)  # Par défaut, un client
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("role", Utilisateur.RoleUtilisateur.ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("role") != Utilisateur.RoleUtilisateur.ADMIN:
            raise ValueError("Le superuser doit avoir le rôle ADMIN")

        return self.create_user(username, email, password, **extra_fields)

# ===================== UTILISATEUR =====================
class Utilisateur(AbstractUser):
    class RoleUtilisateur(models.TextChoices):
        ADMIN = 'ADMIN', 'Administrateur'
        BAILLEUR = 'BAILLEUR', 'Bailleur'
        CLIENT = 'CLIENT', 'Client'
    
    role = models.CharField(max_length=20, choices=RoleUtilisateur.choices)
    telephone = models.CharField(max_length=20, unique=True)
    adresse = models.TextField(blank=True)
    date_inscription = models.DateTimeField(auto_now_add=True)
    
    
    
    class Meta:
        db_table = 'utilisateur'


class Administrateur(Utilisateur):
    code = models.CharField(max_length=50, unique=True)
    
    class Meta:
        db_table = 'administrateur'
    
    def save(self, *args, **kwargs):
        self.role = Utilisateur.RoleUtilisateur.ADMIN
        super().save(*args, **kwargs)


class Bailleur(Utilisateur):
    numero_siret = models.CharField(max_length=14, blank=True, null=True)
    
    class Meta:
        db_table = 'bailleur'
    
    def save(self, *args, **kwargs):
        self.role = Utilisateur.RoleUtilisateur.BAILLEUR
        super().save(*args, **kwargs)


class Client(Utilisateur):
    budget_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    criteres_recherche = models.TextField(blank=True)
    actif = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'client'
    
    def save(self, *args, **kwargs):
        self.role = Utilisateur.RoleUtilisateur.CLIENT
        super().save(*args, **kwargs)


# ===================== ADRESSE =====================
class Adresse(models.Model):
    rue = models.CharField(max_length=255)
    ville = models.CharField(max_length=100)
    code_postal = models.CharField(max_length=10)
    pays = models.CharField(max_length=100, default='France')
    complement = models.TextField(blank=True)
    
    class Meta:
        db_table = 'adresse'
    
    def __str__(self):
        return f"{self.rue}, {self.code_postal} {self.ville}"


# ===================== PROPRIETE =====================
class Propriete(models.Model):
    class TypePropriete(models.TextChoices):
        APPARTEMENT = 'APPARTEMENT', 'Appartement'
        MAISON = 'MAISON', 'Maison'
        COMMERCIAL = 'COMMERCIAL', 'Local Commercial'
        TERRAIN = 'TERRAIN', 'Terrain'
    
    class StatutPropriete(models.TextChoices):
        DISPONIBLE = 'DISPONIBLE', 'Disponible'
        LOUE = 'LOUE', 'Loué'
        RESERVE = 'RESERVE', 'Réservé'
    
    reference = models.CharField(max_length=50, unique=True)
    type_propriete = models.CharField(max_length=20, choices=TypePropriete.choices)
    adresse = models.ForeignKey(Adresse, on_delete=models.CASCADE, related_name='proprietes')
    description = models.TextField()
    prix = models.DecimalField(max_digits=12, decimal_places=2)
    surface = models.DecimalField(max_digits=7, decimal_places=2)
    statut = models.CharField(max_length=20, choices=StatutPropriete.choices, default=StatutPropriete.DISPONIBLE)
    bailleur = models.ForeignKey(Bailleur, on_delete=models.CASCADE, related_name='proprietes')
    date_creation = models.DateTimeField(auto_now_add=True)
    date_mise_a_jour = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'propriete'
    
    def __str__(self):
        return f"{self.reference} - {self.type_propriete}"


# ===================== CONTRAT BAIL =====================
class ContratBail(models.Model):
    class TypeContrat(models.TextChoices):
        HABITATION = 'HABITATION', 'Habitation'
        COMMERCIAL = 'COMMERCIAL', 'Commercial'
    
    propriete = models.OneToOneField(Propriete, on_delete=models.CASCADE, related_name='contrat_bail')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='contrats')
    date_debut = models.DateField()
    date_fin = models.DateField()
    type_contrat = models.CharField(max_length=20, choices=TypeContrat.choices)
    loyer_mensuel = models.DecimalField(max_digits=10, decimal_places=2)
    caution = models.DecimalField(max_digits=10, decimal_places=2)
    condition_particulieres = models.TextField(blank=True)
    date_signature = models.DateTimeField(null=True, blank=True)
    actif = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'contrat_bail'
    
    def __str__(self):
        return f"Contrat {self.id} - {self.propriete.reference}"


# ===================== PAIEMENT =====================
class Paiement(models.Model):
    class MethodePaiement(models.TextChoices):
        CARTE = 'CARTE', 'Carte bancaire'
        VIREMENT = 'VIREMENT', 'Virement bancaire'
        ESPECES = 'ESPECES', 'Espèces'
    
    class StatutPaiement(models.TextChoices):
        EN_ATTENTE = 'EN_ATTENTE', 'En attente'
        PAYE = 'PAYE', 'Payé'
        RETARD = 'RETARD', 'En retard'
    
    contrat = models.ForeignKey(ContratBail, on_delete=models.CASCADE, related_name='paiements')
    date_paiement = models.DateField(null=True, blank=True)
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    statut = models.CharField(max_length=20, choices=StatutPaiement.choices, default=StatutPaiement.EN_ATTENTE)
    methode_paiement = models.CharField(max_length=20, choices=MethodePaiement.choices, default=MethodePaiement.CARTE)
    reference = models.CharField(max_length=100, unique=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'paiement'
        ordering = ['-date_paiement']
    
    def __str__(self):
        return f"Paiement {self.reference} - {self.montant}€"


# ===================== VISITE =====================
class Visite(models.Model):
    class StatutVisite(models.TextChoices):
        PROGRAMMEE = 'PROGRAMMEE', 'Programmée'
        EFFECTUEE = 'EFFECTUEE', 'Effectuée'
        ANNULEE = 'ANNULEE', 'Annulée'
    
    propriete = models.ForeignKey(Propriete, on_delete=models.CASCADE, related_name='visites')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='visites')
    date_visite = models.DateTimeField()
    notes = models.TextField(blank=True)
    interesse = models.BooleanField(default=False)
    statut = models.CharField(max_length=20, choices=StatutVisite.choices, default=StatutVisite.PROGRAMMEE)
    date_creation = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'visite'
        ordering = ['-date_visite']
    
    def __str__(self):
        return f"Visite {self.propriete.reference} - {self.client.get_full_name()}"

    def annuler(self):
        self.statut = self.StatutVisite.ANNULEE
        self.save()
        




class Property(models.Model):
    TYPE_CHOICES = [
        ('appartement', 'Appartement'),
        ('maison', 'Maison'),
        ('studio', 'Studio'),
        ('loft', 'Loft'),
    ]

    title = models.CharField(max_length=200)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10)
    property_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    rooms = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    surface = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='property_images/', null=True, blank=True)

    def __str__(self):
        return self.title
    
    



class Reservation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reservations')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    check_in = models.DateField()
    check_out = models.DateField()
    occupants = models.IntegerField()
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, default='En attente')  # Statut de la réservation
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='reservations')  # Relation avec l'utilisateur


    def __str__(self):
        return f"Reservation for {self.first_name} {self.last_name} at {self.property.title}"
    
    


class Contract(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)  # Propriété concernée
    tenant = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)  # Locataire
    start_date = models.DateField()
    end_date = models.DateField()
    rent = models.DecimalField(max_digits=10, decimal_places=2)
    security_deposit = models.DecimalField(max_digits=10, decimal_places=2)
    document_url = models.URLField()  # URL vers le contrat signé
    is_signed = models.BooleanField(default=False)  # Statut de la signature

    def __str__(self):
        return f"Contrat pour {self.property.title} - Locataire: {self.tenant.username}"
