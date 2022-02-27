from rest_framework import serializers
from UserData.models import Profile
from django.contrib.auth import get_user_model
from Teams.models import Team

User = get_user_model()
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('user','name','surname','gender','country','city','sport','lft','lfc','birthday')
        model = Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','username')
        model = User


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('admin','users','sport','name','city','country','recruting','max_users')
        model = Team