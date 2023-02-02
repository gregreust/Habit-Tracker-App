from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.get_all_habits),
    path('', views.user_habits),
    path('delete/<int:habit_id>/', views.delete_habit),
]