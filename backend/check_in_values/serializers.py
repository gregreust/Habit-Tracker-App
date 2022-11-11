from rest_framework import serializers
from .models import CheckInValues

class CheckInSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInValues
        fields = [
        'id', 'user', 'user_id', 'date', 
        'check_in_1',
        'check_in_2',
        'check_in_3',
        'check_in_4',
        'check_in_5',
        'check_in_6',
        'check_in_7',
        ]

    user_id = serializers.IntegerField(write_only=True)