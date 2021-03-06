# Generated by Django 4.0 on 2022-02-21 17:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sport', models.CharField(max_length=40)),
                ('name', models.CharField(max_length=40)),
                ('recruting', models.BooleanField(default=True)),
                ('max_users', models.IntegerField()),
                ('admin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='admin_of_team', to='auth.user')),
                ('users', models.ManyToManyField(related_name='team', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
