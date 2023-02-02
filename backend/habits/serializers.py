from rest_framework import serializers
from .models import Habits

class HabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habits
        fields = ['id', 'name', 'user', 'user_id']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)