from django.db import models
from authentication.models import User

class Habits (models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    
