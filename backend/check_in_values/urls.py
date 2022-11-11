from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.get_all_checkin_data),
    path('<int:user_id>/', views.get_user_checkin_data),
    path('', views.post_new_check_in),
]