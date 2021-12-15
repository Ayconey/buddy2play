from django.db import models

# Create your models here.

class UserData(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    gender = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    sport = models.CharField(max_length=60)

    def __str__(self):
        return f"{self.name} {self.surname} from {self.city}"