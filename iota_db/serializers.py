from .models import Follow, Post, Profile, Comment
from rest_framework import serializers
from django.http import JsonResponse


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['user','follow']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','birthday','email','username','firstname','lastname','password','private','image','website','bio']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance =self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class BasicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','username','firstname','lastname','private','image','bio','website']

class FollowingSerializer(serializers.ModelSerializer):
    follow = BasicProfileSerializer()
    class Meta:
        model = Follow
        fields = ['follow']

class FollowedBySerializer(serializers.ModelSerializer):
    user = BasicProfileSerializer()
    class Meta:
        model = Follow
        fields = ['user']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    class Meta:
        model = Post
        fields =[ 'id','images','caption','likes','post_creator','comments']

class ProfileWithAllInfoSerializer(serializers.ModelSerializer):
    following = FollowingSerializer(many=True)
    followers = FollowedBySerializer(many=True)
    posts = PostSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['id','birthday','email','username','firstname','lastname','password','private','image','website','bio', 'posts','following','followers']

