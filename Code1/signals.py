from .models import Profile, Tag, Account
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from Room.models import *

@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, *args, **kwargs):
    print(sender)
    print(instance)
    print(created)

    if created:
        new_user = Profile.objects.create(user=instance,full_name=instance)
        Tag.objects.create(user=new_user)
        #Lets create a friend model
        Friend.objects.create(profile=new_user)
        #The prem account
        Account.objects.create(user = new_user)


@receiver(post_save, sender=Relationship)
def post_save_add_to_friends(sender, created, instance, **kwargs):
    sender_ = instance.sender
    receiver_ = instance.receiver

    new_sender = Friend.objects.get(profile=sender_)
    new_receiver = Friend.objects.get(profile=receiver_)

    if instance.accepted == True:

        #Use the friends instances

        sender_.manyFriends.add(new_receiver)
        receiver_.manyFriends.add(new_sender)

        sender_.save()
        receiver_.save()

        #Now let use create a room for this two users

        new_room = Room.objects.create(
            sender=sender_,
            receiver=receiver_,
        )

        #Here we get the new room id
        new_room_id = new_room.room_id

        new_room.name = new_room_id
        new_room.slug = new_room_id

        new_room.save()
