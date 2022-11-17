from pyexpat import model
from django.db import models
from Code1.models import *
from django.contrib.auth.models import User

from django.utils.timesince import timesince

import datetime




# Create your models here.

#Here i will create a friends model
class Friend(models.Model):

    friend_id = models.AutoField(primary_key=True) 

    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)

    friends = models.ManyToManyField(Profile, blank=True, related_name='manyFriends')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.profile.full_name


#who sent the relationship request
class Relationship(models.Model):

    rel_id = models.AutoField(primary_key=True) 

    #The two users related in the friends request
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='receiver')

    #Whether the receiver has accepted 
    accepted = models.BooleanField(default=False)

    #Whether the receiver has accepted 
    denied = models.BooleanField(default=False)

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender}-{self.receiver}"

    def time_since(self):
        return timesince(self.created)


class Room(models.Model):

    room_id = models.AutoField(primary_key=True)  

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

     #The two users related
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='owner')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='partner')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"-{self.receiver}"

#Here we save the messages
class Message(models.Model):

    mess_id = models.AutoField(primary_key=True)

    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='roomMes')      
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userMes')
    content = models.TextField()

    created = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ('created',)