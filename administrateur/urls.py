
from django.urls import path
from .import views


urlpatterns = [
    path('dashboard_admin/',views.dashboard_admin,name="dashboard_admin"),
    path('profil_admin/',views.profil_admin,name="profil_admin"),
    path('add_user/', views.add_user, name='add_user'),
    path('delete_user/<int:user_id>/', views.delete_user, name='delete_user'),
    path('deactivate_user/<int:user_id>/', views.deactivate_user, name='deactivate_user'),
    path('activate_user/<int:user_id>/', views.activate_user, name='activate_user'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),


    
   
]