from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_user_habits),
    path('<int:habit_id>', views.remove_user_habit)
]