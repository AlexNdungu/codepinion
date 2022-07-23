from multiprocessing import context
from django.shortcuts import render
from .models import *
from Code1.models import *
from .forms import *

# Create your views here.

#This is the page to be inherited
def index(request):
    return render(request, 'index.html')

#Ask Question Template
def Ask(request):

    #Getting logged in user
    user = request.user

    theUser = Profile.objects.get(user=user)

    #Query languages Belonging to certain user
    #quiz_tags = Tag.objects.filter(user=user)
    #print(quiz_tags)

    #quiz_tags1 = Tag.objects.all()
    #print(quiz_tags1)

    #tags = Language.objects.filter(tag__user = theUser)
    tags = Language.objects.filter(tag__user = theUser)

    #print(tags)

    #This is an empty list that will contain frameworks
    frame_list = []

    #this list will contain languages
    #frame_lang = []

    #frame_lang.append(tags)

    #print(frame_lang)

    for tag in tags:

        frame = Framework.objects.filter(language__lang_name = tag)

        frame_list.append(frame)

        #print(frame)

    #print(frame_list)


    #lets append this values to this dictionary
    my_frame_dictionary = {}

    for i in range(len(tags)):
        my_frame_dictionary[tags[i]] = frame_list[i]
    print(my_frame_dictionary)

    #tag_frames = Framework.objects.all()

    #many = Framework.objects.filter(language__lang_name = 'Python')

    #tag_frames = tags.frameworks.all()

    #print(many)

    #frame = Framework.objects.filter(language__lang_name = tags)
    #print(frame)

    #The Question form

    questionForm = QuizForm(request.POST or None)

    context = {
        'tags':tags,
        'frame':my_frame_dictionary,
        #'frame': sorted(my_frame_dictionary.items())
        #The question form
        'questionForm':questionForm
    }


    return render(request, 'AddQuiz.html', context)    

#This is the new questions page

def newQuiz(request):
    return render(request, 'newQuiz.html')   

#This will contain individual question details

def quizDetail(request):
    return render(request, 'quizDetail.html')  

#This is the fuction for my questions page

def myQuizs(request):
    return render(request, 'myQuizs.html')    

#My questions details

def myQuizDetail(request):
    return render(request, 'myQuizDetail.html')