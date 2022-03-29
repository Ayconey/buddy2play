from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime
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
    birthday = models.DateField(default=None,null=True)

    buddies = models.ManyToManyField(User,default=None,related_name='buddies_r')

    def __str__(self):
        return f"{self.name} {self.surname} from {self.city}"

    def get_age(self):
        age = datetime.date.today() - self.birthday
        return int((age).days / 365.25)

@receiver(post_save,sender=User)
def create_user_profile(sender,instance,created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save,sender=User)
def save_user_profile(sender,instance,**kwargs):
    instance.profile.save()