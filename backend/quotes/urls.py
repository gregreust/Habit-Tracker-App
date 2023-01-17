from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_db_quotes),
    path('refresh/', views.refresh_quotes),
]