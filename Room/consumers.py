import json

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from django.dispatch import receiver

from .models import Message, Room
from django.contrib.auth.models import User



class videoConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(

            self.room_group_name,
            self.channel_name

        )

        await self.accept()

    async def disconnect(self):

        await self.channel_layer.group_discard(

            self.room_group_name,
            self.channel_name

        )

    async def receive(self, text_data):
        data = json.loads(text_data)

        #message = data['message']
        #username = data['username']
        #room = data['room']
        action = data['action'] 

        if (action == 'new-offer') or (action == 'new-answer'):

            receiver_channel_name = data['message']['receiver_channel_name']

            data['message']['receiver_channel_name'] = self.channel_name

            await self.channel_layer.send(
                receiver_channel_name,
                {
                    'type': 'chat_message',
                    'data':data
                }
            )

            return

        data['message']['receiver_channel_name'] = self.channel_name

        print(data['message']['receiver_channel_name'])

        #await self.save_message(username,room, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'data':data
            }
        )

    async def chat_message(self, event):
        #message = event['message']    
        #username = event['username']  
        #room = event['room']
        data = event['data']

        await self.send(text_data = json.dumps({
            'data': data,
        }))      


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(

            self.room_group_name,
            self.channel_name

        )

        await self.accept()

    async def disconnect(self):

        await self.channel_layer.group_discard(

            self.room_group_name,
            self.channel_name

        )

    async def receive(self, text_data):
        data = json.loads(text_data)

        message = data['message']
        username = data['username']
        room = data['room']
        #action = data['action'] 


        await self.save_message(username,room, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'room': room,
                
            }
        )

    async def chat_message(self, event):
        message = event['message']    
        username = event['username']  
        room = event['room']
        #data = event['data']

        await self.send(text_data = json.dumps({
            'message': message,
            'username': username,
            'room': room,
        }))     

    @sync_to_async    
    def save_message(self, username, room, message):
        user = User.objects.get(username=username)
        room = Room.objects.get(slug=room)

        if(message != '{}'):

            Message.objects.create(
                user=user,
                room=room,
                content=message
            ) 
