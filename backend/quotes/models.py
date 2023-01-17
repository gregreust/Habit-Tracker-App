from django.db import models

class Quotes (models.Model):
    text = models.CharField(max_length=200, blank=True, null=True)
    author = models.CharField(max_length=100, blank=True, null=True)