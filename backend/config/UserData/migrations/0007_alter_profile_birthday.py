# Generated by Django 4.0 on 2022-03-29 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserData', '0006_remove_profile_lfc_remove_profile_lft_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='birthday',
            field=models.DateField(default=None, null=True),
        ),
    ]