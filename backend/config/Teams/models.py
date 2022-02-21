from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Team(models.Model):
    sport = models.CharField()
    max_users = models.IntegerField()
