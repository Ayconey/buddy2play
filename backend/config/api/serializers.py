from rest_framework import serializers
from UserData.models import Profile
from django.contrib.auth import get_user_model


User = get_user_model()
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('user','name','surname','gender','country','city','sport')
        model = Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','username')
        model = User