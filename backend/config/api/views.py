from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer, UserProfileSerializer
from UserData.models import Profile

# Create your views here.
User = get_user_model()

@api_view(['POST'])
def registerUserProfile(request):  # vulnerable
    resp = {}
    # data
    username = request.data['username']
    name = request.data['name']
    surname = request.data['surname']
    gender = request.data['gender']
    country = request.data['country']
    city = request.data['city']
    sport = request.data['sport']
    lft = request.data['lft']
    lfc = request.data['lfc']

    # validation
    if len(name) == 0 or len(surname) == 0 or len(gender) == 0 or len(country) == 0 or len(city) == 0 or len(
            sport) == 0 or len(username) == 0:
        resp['message'] = "one or more fields left empty"
        return Response(resp, status=status.HTTP_400_BAD_REQUEST)

    # if passed validation
    selected_user = User.objects.get(username=username)
    selected_profile = Profile.objects.get(user=selected_user)
    selected_profile.name = name
    selected_profile.surname = surname
    selected_profile.gender = gender
    selected_profile.country = country
    selected_profile.city = city
    selected_profile.sport = sport
    selected_profile.save()
    resp['message'] = "Success"
    return Response(resp, status=status.HTTP_201_CREATED)


@api_view(["GET","POST"])
def UserSearch(request): # try using try and except
    print(request.data)
    try:
        sport = request.data['sport']
    except:
        sport = ""
    try:
        lft = request.data['lft']
    except:
        lft = ""
    try:
        lfcg = request.data['lfcg']
    except:
        lfcg = ""
    try:
        gender = request.data['gender']
    except:
        gender = ""
    try:
        age_min = request.data['age_min']
    except:
        age_min = ""
    try:
        age_max = request.data['age_max']
    except:
        age_max = ""
    try:
        country = request.data['country']
    except:
        country = ""
    try:
        city = request.data['city']
    except:
        city = ""

    selected_users = Profile.objects.all()

    if sport:
        selected_users = selected_users.filter(sport=sport)
    if gender:
        selected_users = selected_users.filter(gender=gender)
    if country:
        selected_users = selected_users.filter(country=country)
    if city:
        selected_users = selected_users.filter(city=city)

    serializer = UserProfileSerializer(selected_users, many=True)
    return Response(data=serializer.data)


# class UserSearch(generics.ListAPIView):
#     serializer_class = UserProfileSerializer
#
#     def get_queryset(self):
#         print(self.request)
#         selected_users = Profile.objects.all()
#
#         return selected_users


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


@api_view(['DELETE',"POST"])
def deleteUserByUsername(request):
    resp = {'message':'success'}
    username = request.data['username']
    selected_user = User.objects.get(username=username)
    selected_user.delete()
    return Response(resp, status=status.HTTP_200_OK)


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()

    def get_object(self):
        pk = self.kwargs['pk']
        return self.queryset.get(pk=pk).profile


class ProfileList(generics.ListCreateAPIView):
    serializer_class = UserProfileSerializer
    queryset = Profile.objects.all()
