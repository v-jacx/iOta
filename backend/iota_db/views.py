from os import PRIO_PGRP
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import FollowSerializer, PhotoSerializer, PostSerializer, ProfileSerializer,ProfileWithAllInfoSerializer, CommentSerializer,BasicProfileWithPostsSerializer,BasicProfileWithFollowSerializer, CreatePostSerializer
from .models import Follow, Profile, Post

# Create User
@api_view(['POST'])
def register(request):
    serializer = ProfileSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    id = serializer.data['id']
    user = Profile.objects.get(id=id)
    refresh = RefreshToken.for_user(user)

    return JsonResponse({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })

#Login with authentication and authorization
@api_view(['POST'])
def login(request):
    username = request.data['username']
    password = request.data['password']

    try:
        user = Profile.objects.get(username=username)
    except:
        raise AuthenticationFailed('User does not exist!')

    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect Password!')

    refresh = RefreshToken.for_user(user)

    return JsonResponse({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })

# Get User
@api_view(['GET'])
def get_user(request, pk):
    profile = Profile.objects.get(id=pk)
    serializer = ProfileWithAllInfoSerializer(profile)
    return JsonResponse(serializer.data)

#Get Profile by username
@api_view(['GET'])
def get_profile(request, username):
    profile = Profile.objects.get(username=username)
    serializer = BasicProfileWithFollowSerializer(profile)
    return JsonResponse(serializer.data)

# Follow
@api_view(['POST'])
def follow(request):
   serializer = FollowSerializer(data=request.data) 
   serializer.is_valid(raise_exception=True)
   serializer.save()
   followed = Profile.objects.get(pk=serializer['follow'].value)
   followed_serializer = BasicProfileWithPostsSerializer(followed)
   return JsonResponse(followed_serializer.data)

# Unfollow
@api_view(['DELETE'])
def unfollow(request ,user ,follow):
    followPair = Follow.objects.get(user=user, follow=follow)
    followPair.delete()
    return JsonResponse({'message':'unfollowed'})

# Create Post
@api_view(['Post'])
def post(request, pk):
    caption = request.data['caption']
    images = []
    for file in request.FILES:
        images.append(request.FILES.get(file))

    post_data = {
        'caption': caption,
        'post_creator': pk
    }
    serializer = CreatePostSerializer(data=post_data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    post_id = serializer.data['id']

    for image in images:
        print(image)
        photo_serializer = PhotoSerializer(data={
            "photo": image,
            "post": post_id
        })
        photo_serializer.is_valid(raise_exception=True)
        photo_serializer.save()
        
    post = Post.objects.get(id=post_id)
    post_serializer = PostSerializer(post)

    return JsonResponse(post_serializer.data)

#Create Comment
@api_view(['POST'])
def comment(request):
    serializer = CommentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return JsonResponse(serializer.data)

