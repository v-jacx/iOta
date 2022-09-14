from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register),
    path('login', views.login),
    path('profile/<int:pk>', views.get_user),
    path('profile/<str:username>',views.get_profile),
    path('follow', views.follow),
    path('unfollow/<int:user>/<int:follow>', views.unfollow),
    path('post/<int:pk>', views.post),
    path('comment', views.comment),
    path('profile/update/<int:pk>', views.updateUser)
]