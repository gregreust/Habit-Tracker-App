from django.db import models

class UserPosts (models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    text = models.CharField(max_length=300)
    likes = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)