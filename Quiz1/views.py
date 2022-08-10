from multiprocessing import context
from django.shortcuts import render
#from requests import request
from .models import *
from Code1.models import *
from .models import *
from .forms import *
from django.http import JsonResponse


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

#THIS VIEW WILL HANDLE THE UPLOAD FOR
def greatForm(request):

    #Here we get the current user
    user = request.user

    theUser = Profile.objects.get(user=user)

    #lets get the data uploaded

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        print(request.POST)

        #Lets get the list of Tags
        tags = request.POST.getlist('Tags')

        #lets get the list of frameworks
        frames = request.POST.getlist('Frameworks')

        #Lets get the question title
        newTitle = request.POST.get('Title')

        #Lets get the body
        newBody = request.POST.get('Body')

        #lets get code 1 language
        lang1 = request.POST.get('lang1')
        #legs get the code 1
        code1 = request.POST.get('code1')

        #lets get code 2 language
        lang2 = request.POST.get('lang2')
        #legs get the code 2
        code2 = request.POST.get('code2')

        #lets get code 3 language
        lang3 = request.POST.get('lang3')
        #legs get the code 3
        code3 = request.POST.get('code3')

        #lets get code 4 language
        lang4 = request.POST.get('lang4')
        #legs get the code 1
        code4 = request.POST.get('code4')

        
        #here we get all the images 
        gallerys = request.FILES.getlist('medias')


        #Here we get the tags in a lop
        print(len(tags))
        print(tags)


        #First we create a question
        new_quiz = Question.objects.create(

            #The owener of the question
            profile = theUser, 

            #The title
            quiz_title = newTitle,

            #The body of question
            body = newBody,

            #to code 1
            code_1_type = lang1,
            code_1 = code1,

            #to code 2
            code_2_type = lang2,
            code_2 = code2,

            #to code 3
            code_3_type = lang3,
            code_3 = code3,

            #to code 4
            code_4_type = lang4,
            code_4 = code4,

        )


        #Here we add the tags
        if(len(tags) > 0):
            print('yes')

            for tag in tags:

                new_tag = Language.objects.get(lang_name = tag)

                new_quiz.tags.add(new_tag)

        #here we add the frameworks
        if(len(frames) > 0):
            print('yes')

            for frame in frames:

                new_frame = Framework.objects.get(frame_name = frame)

                new_quiz.frames.add(new_frame)
                

        #Then we create the gallery

        for galley in gallerys:
            Gallery.objects.create(

                #The question owning the gallery
                question = new_quiz,
                
                #The pictures 
                body_media = galley

            )


    return JsonResponse({'status':'success'})   




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