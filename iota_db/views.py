from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ProfileSerializer
from .models import Profile

@api_view(['POST'])
def register(request):
    serializer = ProfileSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return JsonResponse(serializer.data)

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