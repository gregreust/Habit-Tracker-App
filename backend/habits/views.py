from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Habits
from .serializers import HabitsSerializer
from django.shortcuts import get_list_or_404

#Get all data for testing purposes only 
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_habits(request):
    habits = get_list_or_404(Habits)
    serializer = HabitsSerializer(habits, many=True)
    return Response(serializer.data)

#Get all habits associated with one user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_habits(request):
    habits = get_list_or_404()

