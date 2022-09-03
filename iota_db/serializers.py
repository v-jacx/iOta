from .models import Follow, Profile
from rest_framework import serializers

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['user','follow']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','email','username','firstname','lastname','password','private','image','website','bio']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance =self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance