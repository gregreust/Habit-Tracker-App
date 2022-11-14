from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_habits),
    path('<int:habit_id>/', views.add_or_remove_user_habit),
]