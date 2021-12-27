from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import UserSerializer,UserProfileSerializer
from UserData.models import Profile
# Create your views here.
User = get_user_model()


class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        pk = self.kwargs['pk']
        if pk == 999_999_999:
            return self.request.user
        return self.queryset.get(pk=pk)

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()

    def get_object(self):
        pk = self.kwargs['pk']
        return self.queryset.get(pk=pk).profile



class ProfileList(generics.ListCreateAPIView):
    serializer_class = UserProfileSerializer
    queryset = Profile.objects.all()

