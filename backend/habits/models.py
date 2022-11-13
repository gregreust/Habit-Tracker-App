from django.db import models

class Habits (models.Model):
    name = models.CharField(max_length=100)
    
