from multiprocessing import context
import re
from unicodedata import name
from django.shortcuts import render
from . models import *
from django.http import JsonResponse
import json

from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa#

from Quiz1.models import *

import datetime

# Create your views here.

#Lets generate the pfds
def seePay(request):

    now_user = request.user.profile

    my_records = Record.objects.filter(user = now_user)

    print(now_user)

    context = {
        'my_records':my_records
    }

    return render(request,'Pdf/pay.html',context)

def create_seePay(request):

    now_user = request.user.profile

    profile_pic = request.user.profile.profile_pic.path

    my_records = Record.objects.filter(user = now_user)

    today = datetime.date.today()

    template_path = 'Pdf/payPDF.html'
    context = {
            'my_records': my_records,
            'now_user':now_user,
            'profile_pic':profile_pic,
            'today':today
        }

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'filename="premium_report.pdf"'
    # find the template and render it.
    template = get_template(template_path)

    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(
       html, dest=response)
    # if error then show some funny view
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response


def create_quiz_pdf(request):

    now_user = request.user.profile

    profile_pic = request.user.profile.profile_pic.path

    my_questions = Question.objects.filter(profile = now_user)

    today = datetime.date.today()

    template_path = 'Pdf/quizPDF.html'
    context = {
            'my_questions': my_questions,
            'now_user':now_user,
            'profile_pic':profile_pic,
            'today':today
        }

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'filename="questins_report.pdf"'
    # find the template and render it.
    template = get_template(template_path)

    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(
       html, dest=response)
    # if error then show some funny view
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response

def create_answer_pdf(request):

    now_user = request.user.profile

    profile_pic = request.user.profile.profile_pic.path

    my_answers = Answer.objects.filter(profile = now_user)

    today = datetime.date.today()

    template_path = 'Pdf/answerPDF.html'
    context = {
            'my_answers': my_answers,
            'now_user':now_user,
            'profile_pic':profile_pic,
            'today':today
        }

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'filename="answers_report.pdf"'
    # find the template and render it.
    template = get_template(template_path)

    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(
       html, dest=response)
    # if error then show some funny view
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response    

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

#Premium
def prem(request):

    year = Amount.objects.get(period = '1 Year')
    month = Amount.objects.get(period = '1 Month')

    yr_am = year.amount
    mnth_am = month.amount

    yr_id = year.amount_id
    mnth_id = month.amount_id

    #print(yr_am)
    #print(mnth_am)


    context = {
        'month':mnth_am,
        'year':yr_am,
        'yr_id':yr_id,
        'mnth_id':mnth_id
    }

    return render(request,'Profile/payment.html',context)   
    
#update Prem
def UpdatePrem(request):

    body = json.loads(request.body)

    #print(body)

    am_id = body['amount_id']

    #The subscription
    amount = Amount.objects.get(amount_id = am_id)

    #Now we get the user
    user = request.user.profile

    the_account = Account.objects.get(user = user)

    #Update the accoute
    the_account.amount = amount

    #Now we update the dates
    the_account.payment_date = datetime.datetime.now() 

    #Now set the expiry
    if body['amount'] == '112.00':

        print('year subscription')

        the_account.expiry = datetime.datetime.now() + datetime.timedelta(days=365)

    elif body['amount'] == '13.00':    

        print('month subscription')

        the_account.expiry = datetime.datetime.now() + datetime.timedelta(days=30)

    the_account.active = True

    the_account.save()

    #Now we create a new record
    record = Record.objects.create(
        user = user,
        amount = amount,
        payment_date = the_account.payment_date,
        expiry = the_account.expiry
    )

    #print(record)

    return JsonResponse('Success', safe=False)    

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

