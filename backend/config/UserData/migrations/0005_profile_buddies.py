# Generated by Django 4.0 on 2022-02-23 12:41

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('UserData', '0004_alter_profile_birthday'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='buddies',
            field=models.ManyToManyField(default=None, related_name='buddies_r', to=settings.AUTH_USER_MODEL),
        ),
    ]
