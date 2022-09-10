from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register),
    path('login', views.login),
    path('profile/<int:pk>', views.get_user),
    path('profile/<str:username>',views.get_profile),
    path('follow', views.follow),
    path('post', views.post),
    path('comment', views.comment),
]