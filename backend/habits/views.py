from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Habits
from .serializers import HabitsSerializer
from django.shortcuts import get_list_or_404

User = get_user_model()

#Get all data for testing purposes only 
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_habits(request):
    habits = get_list_or_404(Habits)
    serializer = HabitsSerializer(habits, many=True)
    return Response(serializer.data)

#Get user's habits or add add new habit
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_user_habits(request):
    if request.method == 'GET':

        #this is a reverse m2m query copied from documentation
        habits = get_list_or_404(Habits.objects.filter(user_id=User.id))
        serializer = HabitsSerializer(habits, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = HabitsSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            #Adding the new habit to user's habits
            User.habits.add(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#remove habits for user (not from habits table)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_user_habit(request, habit_id):
    User.habits.remove(habit=habit_id)
    return Response()

    