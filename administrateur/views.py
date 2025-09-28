from django.shortcuts import render

# Create your views here.


def dashboard_admin(request):
    return render(request,'page_admin/dashboard_admin.html')
