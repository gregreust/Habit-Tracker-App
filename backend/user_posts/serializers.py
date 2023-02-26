from rest_framework import serializers
from .models import UserPosts

class UserPostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPosts
        fields = ['id', 'user', 'user_id', 'text', 'likes', 'timestamp']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)