from django.db import models
from authentication.models import User

# Create your models here.
class HabitFrequency (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    habit_name = models.CharField(max_length=140)
    date = models.DateField(auto_now_add=True)
    yes_or_no = models.BooleanField()