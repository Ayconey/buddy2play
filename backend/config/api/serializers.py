from rest_framework import serializers
from UserData.models import Profile
from django.contrib.auth import get_user_model
from Teams.models import Team,MeetingMessage

User = get_user_model()
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('user','name','surname','gender','country','city','sport','birthday')
        model = Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','username')
        model = User


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','admin','users','sport','name','city','country','max_users')
        model = Team

class MessSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','author','title','text','created')
        model = MeetingMessage


