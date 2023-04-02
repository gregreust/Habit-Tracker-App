from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from django.conf import settings
from .models import UserPosts
from .serializers import UserPostsSerializer
from django.shortcuts import get_list_or_404, get_object_or_404

# GET ALL POSTS OR ADD NEW POST
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_all_posts(request):
    if request.method == 'GET':
        posts = get_list_or_404(UserPosts)
        serializer = UserPostsSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = UserPostsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


#LIKE & UNLIKE, DELETE
@api_view(['PATCH', 'DELETE', 'GET'])
# @permission_classes([IsAuthenticated])
def get_post_by_id(request, post_id): 

    post = get_object_or_404(UserPosts, id=post_id)
    
    if request.method == 'PATCH':
        post.likes += 1
        return Response(status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#RETURN COUNT OF LIKES
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def count_likes(request, post_id):
    post = get_object_or_404(UserPosts, id=post_id)
    return Response(post.likes, status=status.HTTP_200_OK)