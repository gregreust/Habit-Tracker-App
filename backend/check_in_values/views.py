from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CheckInValues
from .serializers import CheckInSerializer
from django.shortcuts import get_list_or_404, get_object_or_404
import datetime

#Get all data for testing purposes only 
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_checkin_data(request):
    checkin_data = get_list_or_404(CheckInValues)
    serializer = CheckInSerializer(checkin_data, many=True)
    return Response(serializer.data)

#Getting data for one user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_checkin_data(request):
    date_param = request.query_params.get('date') 
    checkin_data = get_list_or_404(CheckInValues, user=request.user.id)

    if date_param:
        #This turns the date string into a python date and subtracts 40 days
        format = '%Y-%m-%d'      
        python_date = datetime.datetime.strptime(date_param, format) - datetime.timedelta(days=40)
        print(python_date)
        #Returns every entry newer than 40 days ago
        queryset = CheckInValues.objects.filter(date__gt = python_date)
        serializer = CheckInSerializer(queryset, many=True)
        return Response(serializer.data)

    serializer = CheckInSerializer(checkin_data, many=True)
    return Response(serializer.data)

#Creating new record from Daily Check in
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_new_check_in(request):
    serializer = CheckInSerializer(data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


