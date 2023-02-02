from django.db import models
from django.contrib.auth.models import AbstractUser
from habits.models import Habits


class User(AbstractUser):
    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''
    reminder_time = models.IntegerField(null=True)