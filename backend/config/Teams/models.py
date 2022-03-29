from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Team(models.Model):
    admin = models.ForeignKey(User,on_delete=models.CASCADE,related_name='admin_of_team')
    users = models.ManyToManyField(User,default=None,related_name='teams')
    sport = models.CharField(max_length=40)
    name = models.CharField(max_length=40)
    city = models.CharField(max_length=50,default='')
    country = models.CharField(max_length=50,default='')
    max_users = models.IntegerField()


class MeetingMessage(models.Model):
    team = models.ForeignKey(Team,on_delete=models.CASCADE,related_name='messages')
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='team_messages')
    created = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=50)
    text = models.TextField(max_length=250)

