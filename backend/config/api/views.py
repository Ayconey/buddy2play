# django imports
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

# rest imports
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

# other imports
from .serializers import UserSerializer, UserProfileSerializer, TeamSerializer
from UserData.models import Profile
from Teams.models import Team

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


@api_view(["GET", "POST"])
def UserSearch(request):
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
        selected_users = selected_users.filter(sport__startswith=sport)
    if gender:
        selected_users = selected_users.filter(gender=gender)
    if country:
        selected_users = selected_users.filter(country__startswith=country)
    if city:
        selected_users = selected_users.filter(city__startswith=city)

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


@api_view(['DELETE', "POST"])
def specific_user_list(request):
    users = request.data['users']
    user_profiles = []

    for user_pk in users:
        this_user = User.objects.get(pk=user_pk)
        tmp = Profile.objects.get(user=this_user)
        user_profiles.append(tmp)

    serializer = UserProfileSerializer(user_profiles,many=True)
    return Response(status=status.HTTP_200_OK,data=serializer.data)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        pk = self.kwargs['pk']
        if pk == 999_999_999:
            return self.request.user
        return self.queryset.get(pk=pk)


@api_view(['DELETE', "POST"])
def deleteUserByUsername(request):
    resp = {'message': 'success'}
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


class TeamList(generics.ListCreateAPIView):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


@api_view(['POST', ])
def createTeam(request):
    error = False
    try:
        sport = request.data['sport']
    except:
        sport = ""

    try:
        name = request.data['name']
    except:
        name = ""

    try:
        city = request.data['city']
    except:
        city = ""

    try:
        country = request.data['country']
    except:
        country = ""

    try:
        admin = request.data['admin']
    except:
        error = True

    try:
        users = request.data['users']
    except:
        error = True

    try:
        max_users = request.data['max_users']
    except:
        error = True

    if error:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    admin = User.objects.get(pk=admin)
    a = Team.objects.create(sport=sport, name=name, city=city, country=country, admin=admin, max_users=int(max_users))
    a.save()
    a.users.add(admin)
    return Response(status=status.HTTP_201_CREATED)


@api_view(["GET", "POST"])
def give_user_teams(request):
    print(request.user)
    print(request.auth)
    print(request.data)
    current_user = User.objects.get(pk=int(request.data['user_id']))
    selected_teams = current_user.teams.all()

    serializer = TeamSerializer(selected_teams, many=True)
    return Response(data=serializer.data)


@api_view(["GET", "POST"])
def give_admin_teams(request):
    current_user = User.objects.get(pk=int(request.data['user_id']))
    selected_teams = Team.objects.all().filter(admin=current_user)

    serializer = TeamSerializer(selected_teams, many=True)
    return Response(data=serializer.data)

class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


@api_view(["GET", "POST"])
def TeamSearch(request):
    try:
        name = request.data['name']
    except:
        name = ""

    try:
        sport = request.data['sport']
    except:
        sport = ""
    try:
        country = request.data['country']
    except:
        country = ""
    try:
        city = request.data['city']
    except:
        city = ""

    selected_teams = Team.objects.all()

    if name:
        selected_teams = selected_teams.filter(name__startswith=name)
    if sport:
        selected_teams = selected_teams.filter(sport__startswith=sport)
    if country:
        selected_teams = selected_teams.filter(country__startswith=country)
    if city:
        selected_teams = selected_teams.filter(city__startswith=city)

    serializer = TeamSerializer(selected_teams, many=True)
    return Response(data=serializer.data)


@api_view(['DELETE', "POST"])
def kick_from_team(request):
    current_user = User.objects.get(pk=request.data['current_user'])
    user_to_kick=User.objects.get(pk=request.data['user_id'])
    team = Team.objects.get(pk=request.data['team_id'])

    if current_user != team.admin or current_user==user_to_kick: # user cant kick himself and to kick must be admin
        return Response(status=status.HTTP_403_FORBIDDEN)

    team.users.remove(user_to_kick)
    return Response(status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
def addBuddy(request):
    added_pk = int(request.data['added_user_pk'])
    user_id = int(request.data['user_id'])

    current_user_profile = Profile.objects.get(user=User.objects.get(pk=user_id))
    user_being_added = User.objects.get(pk=added_pk)
    current_user_profile.buddies.add(user_being_added)

    return Response(status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
def get_user_buddies(request):
    user_id = int(request.data['user_id'])
    friends = User.objects.get(pk=user_id).profile.buddies.all()
    friends_list = []

    for friend in friends:
        friends_list.append(friend.profile)

    serializer = UserProfileSerializer(friends_list,many=True)
    return Response(status=status.HTTP_200_OK,data=serializer.data)


@api_view(["GET", "POST"])
def check_if_added(request):
    added = False
    print(request.data['user_id'])
    print(request.data['other_id'])
    user = User.objects.get(pk=int(request.data['user_id'])).profile
    other = User.objects.get(pk=int(request.data['other_id']))

    friends = user.buddies.all()
    if other in friends:
        added = True
    return Response(status=status.HTTP_200_OK, data={"added":added})


@api_view(["GET", "POST"])
def unfriend(request):
    unfriended = User.objects.get(pk=int(request.data['unfriended_id']))
    user = User.objects.get(pk=int(request.data['user_id'])).profile

    user.buddies.remove(unfriended)
    return Response(status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
def add_to_team(request):
    current_user =  User.objects.get(pk=int(request.data['current_user']))
    user_to_add = User.objects.get(pk=int(request.data['user_to_add']))
    team = Team.objects.get(pk=request.data['team_id'])

    if current_user == team.admin:
        team.users.add(user_to_add)
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(["GET", "POST"])
def team_change_admin(request):
    current_user = User.objects.get(pk=int(request.data['current_user']))
    new_admin = User.objects.get(pk=int(request.data['new_admin']))
    team = Team.objects.get(pk=int(request.data['team_id']))
    if current_user == team.admin:
        team.admin = new_admin
        team.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_403_FORBIDDEN)