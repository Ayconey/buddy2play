from django.urls import path,include
from .views import UserList,UserDetail,ProfileDetail,ProfileList

urlpatterns = [
    path('api-auth/',include('rest_framework.urls')),
    path('users/',UserList.as_view()),
    path('users/<int:pk>/',UserDetail.as_view()),
    path('users/<int:pk>/profile/',ProfileDetail.as_view()),
    path('users/data/',ProfileList.as_view()),
]