from django.db import models
from django.conf import settings

# Create your models here.
class CheckInValues (models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    check_in_1 = models.IntegerField()
    check_in_2 = models.IntegerField()
    check_in_3 = models.IntegerField()
    check_in_4 = models.IntegerField()
    check_in_5 = models.IntegerField()
    check_in_6 = models.IntegerField()
    check_in_7 = models.IntegerField()



