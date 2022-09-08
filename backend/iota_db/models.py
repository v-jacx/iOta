from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
#Profile Model
class Profile(AbstractBaseUser):
    birthday = models.DateField(auto_now=False, auto_now_add=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    private = models.BooleanField(default=False)
    image = models.URLField(null=True, blank=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    username = models.CharField(max_length=50, unique=True)
    website = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    follow = models.ManyToManyField("self",through='Follow',blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.firstname

#Through table for Following
class Follow(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="following", null=True)
    follow = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="followers", null=True)

#Post Model
class Post(models.Model):
    images = ArrayField(models.URLField(blank=True, null=True), blank=True)
    caption = models.TextField(blank=True, null=True)
    likes = models.PositiveIntegerField(default=0)
    post_creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='posts', null=True)

#Comment Model
class Comment(models.Model):
    commentor = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='creator')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments', null=True)
    content = models.TextField(null=True)
    likes = models.PositiveIntegerField(default=0)