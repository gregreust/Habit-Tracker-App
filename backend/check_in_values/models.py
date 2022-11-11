from django.db import models
from authentication.models import User

# Create your models here.
class CheckInValues (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    check_in_1 = models.IntegerField()
    check_in_2 = models.IntegerField()
    check_in_3 = models.IntegerField()
    check_in_4 = models.IntegerField()
    check_in_5 = models.IntegerField()
    check_in_6 = models.IntegerField()
    check_in_7 = models.IntegerField()



