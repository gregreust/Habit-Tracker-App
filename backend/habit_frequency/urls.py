from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.get_all_habit_data),
    path('user/', views.get_user_habit_data),
    path('', views.post_new_check_in),
]