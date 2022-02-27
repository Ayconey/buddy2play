from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Team(models.Model):
    admin = models.ForeignKey(User,on_delete=models.CASCADE,related_name='admin_of_team')
    users = models.ManyToManyField(User,default=None)
    sport = models.CharField(max_length=40)
    name = models.CharField(max_length=40)
    city = models.CharField(max_length=50,default='')
    country = models.CharField(max_length=50,default='')
    recruting = models.BooleanField(default=True)
    max_users = models.IntegerField()
