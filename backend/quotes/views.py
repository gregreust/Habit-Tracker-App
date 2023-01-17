from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Quotes
from .serializers import QuotesSerializer
import requests
from random import choice

#THIS FUNCTION WILL NOT WORK UNTIL refresh_quotes HAS BEEN CALLED ONCE BY THE FRONTEND
@api_view(['GET'])
def get_db_quotes(request):
    #GRAB A RANDOM QUOTE FROM TABLE 
    pks =  Quotes.objects.values_list('pk', flat=True).order_by('id')
    random_pk = choice(pks)
    quote_data = get_object_or_404(Quotes, pk=random_pk)
    serializer = QuotesSerializer(quote_data)
    return Response(serializer.data, status=status.HTTP_200_OK)


#THIS FUNCTION SHOULD ONLY BE USED BY DEVELOPER TO SET UP APP AND PERIODICALLY REFRESH IF DESIRED
@api_view(['GET'])
def refresh_quotes(request):
    #DELETE ALL RECORDS FROM QUOTES TABLE
    Quotes.objects.all().delete()

    #REPLACE WITH 50 NEW FROM ZENQOUTES API
    response = requests.get('https://zenquotes.io/api/quotes/')
    quote_array = response.json()
    print(quote_array)

    #saving new entry for 50 quotes pulled from zenquotes api
    #see zenquotes documentation for more details
    for entry in quote_array:
        new_quote = Quotes (
            text = entry['q'],
            author = entry['a']
        )
        new_quote.save()
    return Response(status=status.HTTP_200_OK)
