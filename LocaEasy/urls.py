
from django.contrib import admin
from django.urls import path,include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('administrateur/',include('administrateur.urls')),
    path('client/',include('client.urls')),
    path('bailleur/',include('bailleur.urls')),
    path('',include('visiteur.urls')),
    path('bd/', include('bd.urls'))
]
