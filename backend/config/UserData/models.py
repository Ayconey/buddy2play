from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.

class UserData(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='user_data')
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    gender = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    sport = models.CharField(max_length=60)
    #date_of_birth = models.DateField()
    def __str__(self):
        return f"{self.name} {self.surname} from {self.city}"