from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import UserPosts
from .serializers import UserPostsSerializer
from django.shortcuts import get_list_or_404, get_object_or_404

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated()])
def get_all_posts(request):



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated()])
def get_post_by_id(request, post_id):