from rest_framework import serializers
from .models import UserPosts
from authentication.serializers import UserSerializer



class UserPostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPosts
        fields = ['id', 'user', 'user_id', 'text', 'likes', 'timestamp']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)
    likes = UserSerializer(read_only=True, many=True)

    #DO I NEED TO GET RID OF DEPTH TO PREVENT TOO MUCH DATA?????