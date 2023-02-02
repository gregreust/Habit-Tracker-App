from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Habits
from .serializers import HabitsSerializer
from django.shortcuts import get_list_or_404, get_object_or_404

User = get_user_model()

#Get all habits from list
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_habits(request):
    habits = get_list_or_404(Habits)
    serializer = HabitsSerializer(habits, many=True)
    return Response(serializer.data)

#Get user's habits or add add new habit
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_habits(request):
    this_user = User.objects.get(username=request.user)
    if request.method == 'GET':
        habits = get_list_or_404(user = this_user.id)
        serializer = HabitsSerializer(habits, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = HabitsSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_habit(request, habit_id):
    habit = get_object_or_404(Habits, id=habit_id)
    habit.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

    