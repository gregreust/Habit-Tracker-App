from django.db import models

class Quotes (models.Model):
    text = models.CharField(max_length=200)
    author = models.CharField(max_length=100)