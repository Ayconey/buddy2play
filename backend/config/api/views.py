from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import UserSerializer,UserDataSerializer
from UserData.models import UserData
# Create your views here.
User = get_user_model()


class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDataDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserDataSerializer
    queryset = UserData.objects.all()


