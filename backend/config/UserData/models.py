from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    name = models.CharField(max_length=50, blank=True)
    surname = models.CharField(max_length=50, blank=True)
    gender = models.CharField(max_length=50, blank=True)

    country = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)
    sport = models.CharField(max_length=60, blank=True)
    lft = models.BooleanField(default=False)
    lfc = models.BooleanField(default=False)
    birthday = models.DateField(default='2000-01-01')
    def __str__(self):
        return f"{self.name} {self.surname} from {self.city}"

@receiver(post_save,sender=User)
def create_user_profile(sender,instance,created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save,sender=User)
def save_user_profile(sender,instance,**kwargs):
    instance.profile.save()