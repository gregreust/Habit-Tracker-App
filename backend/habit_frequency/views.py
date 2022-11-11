from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import HabitFrequency
from .serializers import HabitFreqSerializer
from django.shortcuts import get_list_or_404, get_object_or_404

#Get all data for testing purposes only 
@api_view([GET])
@permission_classes([AllowAny])
def get_all_habit_data(request):
    habit_data = get_list_or_404(HabitFrequency)
    serializer = HabitFreqSerializer(habit_data, many=True)
    return Response(serializer.data)

#Getting data for one user
@api_view([GET])
@permission_classes([IsAuthenticated])
def get_user_habit_data(request):
    habit_data = get_list_or_404(HabitFrequency, user=request.user)
    serializer = HabitFreqSerializer(habit_data, many=True)
    return Response(serializer.data)

#Creating new record from Daily Check in
@api_view([POST])
@permission_classes([IsAuthenticated])
def post_new_check_in(request):
    serializer = HabitFreqSerializer(data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
