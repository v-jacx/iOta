from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register),
    path('login', views.login),
    path('profile/<int:pk>', views.get_user),
    path('follow', views.follow),
    path('post', views.post),
    path('comment', views.comment)
]