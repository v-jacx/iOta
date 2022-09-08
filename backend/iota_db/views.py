from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import FollowSerializer, FollowingSerializer, PostSerializer, ProfileSerializer,ProfileWithAllInfoSerializer, CommentSerializer,BasicProfileWithPostsSerializer
from .models import Follow, Profile

# Create User
@api_view(['POST'])
def register(request):
    serializer = ProfileSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return JsonResponse(serializer.data)

#Login with authentication and authorization
@api_view(['POST'])
def login(request):
    username = request.data['username']
    password = request.data['password']

    user = Profile.objects.get(username=username)

    if user is None:
        raise AuthenticationFailed('User does not exist!')

    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect Password!')

    refresh = RefreshToken.for_user(user)

    return JsonResponse({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'payload': refresh.payload
    })

# Get User
@api_view(['GET'])
def get_user(request, pk):
    profile = Profile.objects.get(id=pk)
    serializer = ProfileWithAllInfoSerializer(profile)
    return JsonResponse(serializer.data)

# Follow
@api_view(['POST'])
def follow(request):
   serializer = FollowSerializer(data=request.data) 
   serializer.is_valid(raise_exception=True)
   serializer.save()
   return JsonResponse(serializer.data)

# Create Post
@api_view(['Post'])
def post(request):
    serializer = PostSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return JsonResponse(serializer.data)

#Create Comment
@api_view(['POST'])
def comment(request):
    serializer = CommentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return JsonResponse(serializer.data)

