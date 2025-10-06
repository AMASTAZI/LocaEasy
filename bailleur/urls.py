
from django.urls import path
from .import views

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('page_bailleur/',views.page_bailleur,name="page_bailleur"),
    path('page_bailleur_profile/',views.page_profil_bailleur,name="page_bailleur_profile"),
    path('page_bailleur_gerer_proprieter/',views.page_gerer_propriete,name="gerer_proprieter"),
    path('ajouter-propriete/', views.add_property, name='add_property'),
    path('delete-property/<int:property_id>/', views.delete_property, name='delete_property'),
    path('property/edit/<int:property_id>/', views.edit_property, name='edit_property'),
    path('get_property/<int:property_id>/', views.get_property, name='get_property'),



 
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)