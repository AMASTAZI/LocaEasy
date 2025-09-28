from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def accueil(request):
    
        
        return HttpResponse(f"""
            <html>
                <head><title>LocaEasy</title></head>
                <body>
                    <h2>Bienvenue  sur la page d'accueil du site LocaEasy.</h2>
                </body>
            </html>
        """)
    
