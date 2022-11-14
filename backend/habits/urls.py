from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.get_all_habits),
    path('', views.user_habits),
    path('<int:habit_id>/', views.add_or_remove_user_habit),
    path('delete/<int:habit_id>/', views.delete_habit),
]