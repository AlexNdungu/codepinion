from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from Code1.models import *
from .models import *
from django.db.models import Q

# Create your views here.

def sendRequest(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #The sender
        sender = request.POST.get('sender')

        new_sender = Profile.objects.get(profile_id=sender)

        #Receiver
        receiver = request.POST.get('receiver')

        new_receiver = Profile.objects.get(profile_id=receiver)


        Relationship.objects.create(

            sender=new_sender,
            receiver=new_receiver
            
        )

    return JsonResponse({'status':'success'})


def rooms(request):

    current = request.user.profile

    rooms = Room.objects.filter(Q(sender=current) | Q(receiver=current))

    print(rooms)

    context = {
        'rooms':rooms
    }

    return render(request, 'Chat\chatHome.html',context)  

#Let us create a view where we will choose from the available rooms
def room(request, slug):

    if request.user.is_authenticated:

        current = request.user.profile

        rooms = Room.objects.filter(Q(sender=current) | Q(receiver=current))

        room = Room.objects.get(slug = slug)

        messages = Message.objects.filter(room=room)[0:25]

    else:

        messages = ''

        rooms = ''

        room = ''


    context = {
        'room':room,
        'rooms':rooms,
        'messages':messages
    }

    return render(request, 'Chat\chat.html',context)    


def videos(request):

    current = request.user.profile

    rooms = Room.objects.filter(Q(sender=current) | Q(receiver=current))

    print(rooms)

    context = {
        'rooms':rooms
    }

    return render(request, 'Video/videoHome.html',context)  


def video(request,slug):

    current = request.user.profile

    rooms = Room.objects.filter(Q(sender=current) | Q(receiver=current))

    room = Room.objects.get(slug = slug)

    print(rooms)

    context = {
        'rooms':rooms,
        'room':room
    }

    return render(request, 'Video/video.html',context)     

def shares(request):

    current = request.user.profile

    rooms = Room.objects.filter(Q(sender=current) | Q(receiver=current))

    print(rooms)

    context = {
        'rooms':rooms
    }

    return render(request, 'Share/shareHome.html',context)    

def share(request,slug):

    current = request.user.profile

    rooms = Room.objects.filter(Q(sender=current) | Q(receiver=current))

    room = Room.objects.get(slug = slug)

    print(rooms)

    context = {
        'rooms':rooms,
        'room':room
    }

    return render(request, 'Share/share.html',context)        