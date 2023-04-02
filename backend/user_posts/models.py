from django.db import models
from django.conf import settings

class UserPosts (models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='posts_created')
    text = models.CharField(max_length=300)
    likes = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)