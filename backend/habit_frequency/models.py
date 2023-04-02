from django.db import models
from django.conf import settings

# Create your models here.
class HabitFrequency (models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    habit_name = models.CharField(max_length=140)
    date_submitted = models.DateField(auto_now_add=True)
    yes_or_no = models.BooleanField()