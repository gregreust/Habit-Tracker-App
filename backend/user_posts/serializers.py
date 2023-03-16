from rest_framework import serializers
from .models import UserPosts
from authentication.serializers import UserSerializer



class UserPostsSerializer(serializers.ModelSerializer):

    extra_kwargs = {'user': {'read_only': True}}
    likes = UserSerializer(read_only=True, many=True)
    class Meta:
        model = UserPosts
        fields = ['id', 'user', 'text', 'likes', 'timestamp']
        depth = 1

   

    #DO I NEED TO GET RID OF DEPTH TO PREVENT TOO MUCH DATA?????