from .models import Follow, Photo, Post, Profile, Comment
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

class FollowedBySerializer(serializers.ModelSerializer):
    user = BasicProfileSerializer()
    class Meta:
        model = Follow
        fields = ['user']

class CommentSerializer(serializers.ModelSerializer):
    commentor = BasicProfileSerializer()
    class Meta:
        model = Comment
        fields = ['id','commentor','content','likes']

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields =[ 'id','caption','likes','post_creator']

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['photo','post']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    images = PhotoSerializer(many=True)
    class Meta:
        model = Post
        fields =[ 'id','images','caption','likes','post_creator','comments']

        
class BasicProfileWithPostsSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
    class Meta:
        model = Profile
        fields = ['id','username','firstname','lastname','private','image','bio','website','posts']

class FollowingSerializer(serializers.ModelSerializer):
    follow = BasicProfileWithPostsSerializer()
    class Meta:
        model = Follow
        fields = ['follow']

class ProfileWithAllInfoSerializer(serializers.ModelSerializer):
    following = FollowingSerializer(many=True)
    followers = FollowedBySerializer(many=True)
    posts = PostSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['id','birthday','email','username','firstname','lastname','private','image','website','bio', 'posts','following','followers']

class BasicProfileWithFollowSerializer(serializers.ModelSerializer):
        following = FollowingSerializer(many=True)
        followers = FollowedBySerializer(many=True)
        posts = PostSerializer(many=True)

        class Meta:
            model = Profile
            fields = ['id','username','firstname','lastname','private','image','bio','website', 'posts','following','followers']