from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *
from . import views

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('reminder/', views.set_reminder_time)
]
