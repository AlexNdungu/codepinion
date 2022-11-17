from multiprocessing import context
import re
from unicodedata import name
from django.shortcuts import render
from . models import *
from django.http import JsonResponse
# Create your views here.

#Profile Fuction
def Me(request):

    #Here we get all the tags
    tags = Language.objects.all()

    context = {
        'tags':tags,
    }

    return render(request, 'Profile/profile.html', context)

#Here we share our screen

def shareScreen(request):
    
    return render(request, 'share.html')

def getTags(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        user = request.user

        theUser = Profile.objects.get(user=user)

        tags = Language.objects.filter(tag__user = theUser)

        print(tags)


        data = []

        for tag in tags:
            item = {
                'name':tag.lang_name,
                'icon':tag.language_url,
            }
            data.append(item)

    return JsonResponse({'status':'success','data':data})

#This view will update the form

def profileForm(request):


    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        print(request.POST)

        profile = Profile.objects.get(user = request.user)

        print(profile)

        #Now let use update this profile

        fullName = request.POST.get('FullName')

        userBio = request.POST.get('Bio')

        #Check if there is any profile image being posted from the front end

        if request.FILES.get('ProfilePicture') != None:

            profilePicture = request.FILES.get('ProfilePicture')

        #Check if there is any info picture being sent from the front end

        if request.FILES.get('InfoPicture') != None:

            infoPicture = request.FILES.get('InfoPicture')

        #Now let use upload the the db


        profile.full_name = fullName
        profile.bio = userBio

        if request.FILES.get('ProfilePicture') != None:
            profile.profile_pic = profilePicture

        if request.FILES.get('InfoPicture') != None:    
            profile.info_picture = infoPicture
        #now we save
        profile.save()

        #Now let use update the tags

        removeTags = request.POST.getlist('RemoveTag')

        addTags = request.POST.getlist('AddTags')

        Utag = Tag.objects.get(user = profile)

        #Lets remove the new tags
        if(len(removeTags) > 0):
            print('yes')

            for rtag in removeTags:

                new_tag_r = Language.objects.get(lang_name = rtag)

                Utag.tags.remove(new_tag_r)

        #Here let use add the tags
        if(len(addTags) > 0):
            print('yes')

            for atag in addTags:

                new_tag_a = Language.objects.get(lang_name = atag)

                Utag.tags.add(new_tag_a)


    return JsonResponse({'status':'success'})    

