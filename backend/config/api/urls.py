from django.urls import path,include
from .views import UserList,UserDetail,UserDataDetail,UserDataList

urlpatterns = [
    path('api-auth/',include('rest_framework.urls')),
    path('users/',UserList.as_view()),
    path('users/<int:pk>/',UserDetail.as_view()),
    path('users/<int:pk>/data/',UserDataDetail.as_view()),
    path('users/data/',UserDataList.as_view()),
]