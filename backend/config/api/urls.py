from django.urls import path,include
from .views import UserList,UserDetail,ProfileDetail,ProfileList,registerUserProfile,deleteUserByUsername,UserSearch,\
    TeamList,TeamDetail,createTeam,give_user_teams,TeamSearch,addBuddy,get_user_buddies,check_if_added,unfriend, \
    specific_user_list,kick_from_team,add_to_team,give_admin_teams

urlpatterns = [
    path('api-auth/',include('rest_framework.urls')),
    # all about users
    path('users/',UserList.as_view()),
    path('users/specific_list/',specific_user_list),
    path('users/<int:pk>/',UserDetail.as_view()),
    path('users/<int:pk>/profile/',ProfileDetail.as_view()),
    path('users/add_buddy/',addBuddy),
    path('users/unfriend_buddy/',unfriend),
    path('users/getFriends/',get_user_buddies),
    path('users/check_if_added/',check_if_added),
    path('users/profile/',ProfileList.as_view()),
    path('users/update_profile/',registerUserProfile),
    path('users/dbu/',deleteUserByUsername),
    path('users/searched/',UserSearch),
    # all about teams
    path('teams/',TeamList.as_view()),
    path('teams/<int:pk>/',TeamDetail.as_view()),
    path('teams/create/',createTeam),
    path('teams/of_this_user/',give_user_teams),
    path('teams/of_this_user_admin/',give_admin_teams),
    path('teams/searched/',TeamSearch),
    path('teams/kick_from_team/',kick_from_team),
    path('teams/add_to_team/',add_to_team),
]