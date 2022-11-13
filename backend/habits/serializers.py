from rest_framework import serializers
from .models import Habits

class HabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habits
        fields = ['id', 'name']