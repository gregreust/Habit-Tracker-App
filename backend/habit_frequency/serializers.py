from rest_framework import serializers
from .models import HabitFrequency

class HabitFreqSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitFrequency
        fields = ['id', 'user', 'user_id', 'habit_name', 'date_submitted', 'yes_or_no']

    user_id = serializers.IntegerField(write_only=True)