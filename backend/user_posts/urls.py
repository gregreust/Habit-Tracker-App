from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_posts),
    path('<int:post_id>/', views.get_post_by_id),
    path('/likes/<int:post_id>', views.count_likes)
]