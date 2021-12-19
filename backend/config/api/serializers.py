from rest_framework import serializers
from UserData.models import UserData
from django.contrib.auth import get_user_model


User = get_user_model()
class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('user','name','surname','gender','country','city','sport')
        model = UserData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','username')
        model = User