from django.urls import path,include
from .views import UserList,UserDetail,ProfileDetail,ProfileList,registerUserProfile,deleteUserByUsername,UserSearch

urlpatterns = [
    path('api-auth/',include('rest_framework.urls')),
    path('users/',UserList.as_view()),
    path('users/<int:pk>/',UserDetail.as_view()),
    path('users/<int:pk>/profile/',ProfileDetail.as_view()),
    path('users/profile/',ProfileList.as_view()),
    path('users/update_profile/',registerUserProfile),
    path('users/dbu/',deleteUserByUsername),
    path('users/searched/',UserSearch),
]