from asyncio.windows_events import NULL
from multiprocessing import context
from django.shortcuts import render,HttpResponseRedirect
#from requests import request
from .models import *
from Code1.models import *
from .models import *
from Room.models import *
from .forms import *
from django.http import JsonResponse
import json
from django.contrib.auth import logout
from django.utils.formats import localize

from django.db.models import Q
from Room.models import *

import datetime


#Now we import what is required for ml
import pandas as pd
from tqdm import tqdm
from bs4 import BeautifulSoup
import re
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances
from sklearn.model_selection import train_test_split
import numpy as np
import scipy.sparse
import html
from spacy.lang.en.stop_words import STOP_WORDS




#import nltk
#nltk.download('stopwords')
# Create your views here.

#We logout the user
#Logout
def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/')

#This is the page to be inherited
def index(request):

    if request.user.is_authenticated:

        current_profile = request.user.profile

        criterion1 = Q(receiver=current_profile)
        criterion2 = Q(accepted=False)
        criterion3 = Q(denied=False)

        current_request = Relationship.objects.filter(criterion1 & criterion2 & criterion3)

        print(current_request)

    else:

        current_request = 'Cannot Request'


    context = {
        'current_request':current_request
    }

    return render(request, 'index.html', context)

#Accept hand shake

def Aindex(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #Lets get the relation id
        relId = int(request.POST.get('id'))

        #Get the relation with its id
        the_rel = Relationship.objects.get(rel_id=relId)

        print(the_rel)

        #the_rel.accepted = True

        #the_rel.save()

        print('saved successfully')


    return JsonResponse({'status':'success'})  


#Decline handshake

def Dindex(request):  

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #Lets get the relation id
        relId = int(request.POST.get('id'))

        #Get the relation with its id
        the_rel = Relationship.objects.get(rel_id=relId)

        print(the_rel)

        #the_rel.denied = True

        #the_rel.save()

        print('saved successfully')  

    return JsonResponse({'status':'success'})



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



#Now we use ml to check if such a question already exists

def search(request):

    #Lets imporove the algorithim using ml
    #We defin ethe tags

    # labels = {"Java" : 0, "JavaScript" : 1, "Php" : 2, "Python" : 3}
    # labels_map = { 0 : "Java" , 1 : "JavaScript" , 2 : "Php" , 3 : "Python"}

    # #We map the numbers to the tags
    # quiz_frame["Tags"] = quiz_frame["Tags"].map(labels)

    # print(quiz_frame)

    # #We define x and y
    # X = quiz_frame.Title.values
    # y = quiz_frame.Tags.values


    # # #Lets split the y and x
    # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20,stratify = y)
    # X_train, X_cv, y_train, y_cv = train_test_split(X_train, y_train, test_size=0.25, stratify = y_train)
    # print(X_train.shape, X_test.shape, X_cv.shape)

    #now let use ml to predict the tags the user is asking
    #We read the model
    #model = pd.read_pickle(r"C:\Users\Alex Meta Ndung'u\Documents\Django\codeSage\Quiz1\model.pickle")#C:\Users\Alex Meta Ndung'u\Documents\Django\codeSage\Quiz1

    #data = scipy.sparse.load_npz('data.npz')

    stack_data = pd.read_csv(r"C:\Users\Alex Meta Ndung'u\Documents\Django\codeSage\Quiz1\train.csv")
    stack_data.shape

    stack_data.duplicated()
    stack_data.drop_duplicates()
    stack_data.drop(['Id', 'CreationDate','Y'], axis=1, inplace=True)


    #Now we clean the dataset
    def data_cleaning(text):
        #Removing Html tag
        def escaping_html_char(text):
            
            parse_text = html.unescape(text)
            return parse_text
        #Here we clean the data
        def clean(text):
            
            text = re.sub('[^\w\s]'," ", text.lower())
            #text = " ".join([word for word in text.split() if word not in STOP_WORDS])
            return text
        
        text = escaping_html_char(text)
        text = clean(text)
        return text

    stack_data['Tags'] = stack_data['Tags'].apply(data_cleaning)

    new_tags = []
    for i in tqdm(range(stack_data.shape[0])):
        j = stack_data.Tags.iloc[i].split()[0]
        new_tags.append(j)

    stack_data.Tags = new_tags
    

    labels = {"c#" : 0, "java" : 1, "c++" : 2, "c" : 3, "ios" : 4, "javascript" : 5, "python" : 6, "php" : 7}
    labels_map = {0 : "c#" , 1 : "java" , 2 : "c++" , 3 : "c", 4 : "ios", 5 : "javascript", 6 : "python", 7 : "php"}

    stack_data["Tags"] = stack_data["Tags"].map(labels)

    stack_data = stack_data.dropna()
    #stack_data = stack_data[np.isfinite(stack_data).all(1)]
    stack_data = stack_data.reset_index(drop = True)

    tfidf = TfidfVectorizer()
    data = tfidf.fit_transform(stack_data.Title)
    data.shape
        #stack_data_title = pd.read_pickle(r".\Quiz1\stackData.pickle")
    #data = tfidf.fit_transform(stack_data_title)
    #data.shape  

    model = pd.read_pickle(r".\Quiz1\model.pickle")

    def process_query(query):
        preprocessed_reviews = []
        sentance = re.sub("\S*\d\S*", "", query).strip()
        sentance = re.sub('[^A-Za-z]+', ' ', sentance)
        sentance = ' '.join(e.lower() for e in sentance.split() if e.lower() not in stopwords.words('english'))
        preprocessed_reviews.append(sentance.strip())
        return preprocessed_reviews


    def tfidf_search(query):
        query = process_query(query)
        query_trans = tfidf.transform(query)
        pairwise_dist = pairwise_distances(data, query_trans)
        
        indices = np.argsort(pairwise_dist.flatten())[0:10]
        df_indices = list(stack_data.index[indices])
        return df_indices


    def label(query):
        query = process_query(query)
        query = tfidf.transform(query)
        ans = model.predict(query)
        #ans = clf.predict(query)
        return labels_map[ans[0]]


    def change_query(query):
        tag = label(query)
        return query + " " + tag


    def enter_queries(query) : 
        print("The Query is :", query)
        query = change_query(query)
        df_indices = tfidf_search(query)
        print("The Model Interpreted Query is :", query)
        print("Top Results : ")
        for i in (df_indices):
            print("Title : ", stack_data.Title.iloc[i])


    query = "Android"
    enter_queries(query)        
        

    return JsonResponse({'message':'success'})


def miniSearch(request):

    #First lets get all of the questions in the db
    all_questions_db = Question.objects.all()

    #we loop through the data to create the columns in the dataframe
    #here are the colums
    #The id of the question
    Qid = []
    #The ttitle of the question
    Title = []
    #The body of the question
    Body = []
    #The tags of the question
    Tags = []

    #now lets create the dataframe
    #For loop
    for question in all_questions_db:

        one_tag = []

        all_tags = question.tags.all()

        #print(all_tags)

        for tag in all_tags:

            #print(tag.lang_name)
            one_tag.append(tag.lang_name)

            print(one_tag)


        #All ids
        Qid.append(question.quiz_id)
        #All the titles
        Title.append(question.quiz_title)
        #The body
        Body.append(question.body)
        #The tags
        Tags.append(one_tag)

    #first we create a dataframe containing all of the questions in the db

    data = {'Qid':Qid, 'Title':Title,'Body':Body,'Tags':Tags}

    quiz_frame = pd.DataFrame(data)

    print(quiz_frame.head(2))


    #Now we clean the data
    processed_reviews = []

    for sentence in tqdm(quiz_frame.Title.values):
        sentence = re.sub(r"http\s", "", sentence)
        sentence = BeautifulSoup(sentence, 'lxml').get_text()
        sentence = re.sub("\S*\d\S*", "", sentence).strip()
        sentence = re.sub('[^A-Za-z]+', ' ', sentence)

        sentence = ' '.join(e.lower() for e in sentence.split() if e.lower() not in stopwords.words('english'))
        processed_reviews.append(sentence.strip())

    
    #We ame it the title 
    quiz_frame.Title = processed_reviews

    #print(quiz_frame.head())

    #Now we clean the tags
    new_tags = []

    #for i in tqdm(range(quiz_frame.shape[0])):
        #j = quiz_frame.Tags.iloc[i].split()[0]
        #new_tags.append(j)

    #quiz_frame.Tags = new_tags 

    for i in tqdm(range(quiz_frame.shape[0])):

        for j in quiz_frame.Tags.iloc[i]:
        #j = quiz_frame.Tags.iloc[i].split()[0]

            print(j)

        new_tags.append(j)

    quiz_frame.Tags = new_tags 

    #print(quiz_frame)

    #labels = {"c#" : 0, "Java" : 1, "c++" : 2, "c" : 3, "ios" : 4, "JavaScript" : 5, "Python" : 6, "Php" : 7}
    #labels_map = {0 : "c#" , 1 : "Java" , 2 : "c++" , 3 : "c", 4 : "ios", 5 : "JavaScript", 6 : "Python", 7 : "Php"}

    #quiz_frame["Tags"] = quiz_frame["Tags"].map(labels)

    #print(quiz_frame)

    #Now let use perform the ml parts
    vectorizer = CountVectorizer()
    bow_features = vectorizer.fit_transform(quiz_frame['Title'])
    print(bow_features.get_shape())

    tfidf = TfidfVectorizer()
    tfidf_features = tfidf.fit_transform(quiz_frame.Title)
    tfidf_features.get_shape()
    

    #Now we perform the search
    def process_query(query):
        preprocessed_reviews = []
        sentance = re.sub("\S*\d\S*", "", query).strip()
        sentance = re.sub('[^A-Za-z]+', ' ', sentance)
        sentance = ' '.join(e.lower() for e in sentance.split() if e.lower() not in stopwords.words('english'))
        preprocessed_reviews.append(sentance.strip())
        return preprocessed_reviews

    def tfidf_search(tfidf, query):
        query = process_query(query)
        query_trans = tfidf.transform(query)
        pairwise_dist = pairwise_distances(tfidf_features, query_trans)
        
        indices = np.argsort(pairwise_dist.flatten())[0:10]
        df_indices = list(quiz_frame.index[indices])
        return df_indices    

    def bow_search(vectorizer, query):
        query = process_query(query)
        query_trans = vectorizer.transform(query)
        pairwise_dist = pairwise_distances(bow_features, query_trans)
        
        indices = np.argsort(pairwise_dist.flatten())[0:10]
        df_indices = list(quiz_frame.index[indices])
        return df_indices

    def search(query, typ = "tfidf"):
        if typ == "tfidf":
            val = tfidf_search(tfidf, query)
        else :
            val = bow_search(vectorizer, query)
        return val


    #Lets perform the search
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':  

        search_title = request.POST.get('title')  

        #The ids of the questions results
        the_questions_id = []
        #The questions themselves
        the_questions_result = []

        query = str(search_title)
        df_indices = search(query)    

        print("The Query is :   ", query)
        print("Top Results : ")
        for i in (df_indices):
            print("Title : ", quiz_frame.Title.iloc[i])
            print("ID : ", quiz_frame.Qid.iloc[i])
            the_questions_id.append(quiz_frame.Qid.iloc[i])

        print(the_questions_id)


        for one_id in the_questions_id:

            result_quiz = Question.objects.get(quiz_id = one_id)

            the_questions_result.append(result_quiz)
        
        print(the_questions_result)

        the_response_quits = []

        for one_quiz in the_questions_result:

            tags = []

            for tag in one_quiz.tags.all():
                print(tag.lang_name)
                tags.append(tag.lang_name)
                print(tags)

            item = {
                'quiz_id' : one_quiz.quiz_id,
                'profile': one_quiz.profile.profile_pic.url,
                'Full_name' : one_quiz.profile.full_name,
                'create_date' : localize(one_quiz.created),
                'title' : one_quiz.quiz_title,
                #Tags are many
                'tags' : tags,
            }

            the_response_quits.append(item)


        return JsonResponse({'message':'success','quizs':the_response_quits})



#This is the new questions page

def newQuiz(request):

    if request.user.is_authenticated:

        current_profile = request.user.profile

        current_profile_tag = Tag.objects.get(user = current_profile)

        all_user_tags = current_profile_tag.tags.all()

        criterion1 = Q(receiver=current_profile)
        criterion2 = Q(accepted=False)

        current_request = Relationship.objects.filter(criterion1 & criterion2)

        current_request_count = Relationship.objects.filter(criterion1 & criterion2).count()

        #print(datetime.datetime.now())

        Questions = Question.objects.filter(tags__in = all_user_tags).distinct().count()

    else:
        Questions = 0
        current_request = 'Cannot Request'
        current_request_count = 0 
    
    context = {
        'Questions': Questions,
        'current_request':current_request,
        'current_request_count':current_request_count
    }

    return render(request, 'newQuiz.html', context)   #


#Here we will return all the questions in json

def load_quizs(request):

    if request.user.is_authenticated:

        current_profile = request.user.profile

        current_profile_tag = Tag.objects.get(user = current_profile)

        all_user_tags = current_profile_tag.tags.all()

        #Questions = Question.objects.all().order_by('-created')

        Questions = Question.objects.filter(tags__in = all_user_tags).distinct().order_by('-created')

        quizs = []

        for quiz in Questions:

            tags = []

            for tag in quiz.tags.all():
                #print(tag.lang_name)
                tags.append(tag.lang_name)
                #print(tags)

            item = {
                'quiz_id' : quiz.quiz_id,
                'profile': quiz.profile.profile_pic.url,
                'Full_name' : quiz.profile.full_name,
                'create_date' : localize(quiz.created),
                'title' : quiz.quiz_title,
                #Tags are many
                'tags' : tags,
            }

            quizs.append(item)

    else:

        # current_profile = request.user.profile

        # current_profile_tag = Tag.objects.get(user = current_profile)

        # all_user_tags = current_profile_tag.tags.all()

        # #Questions = Question.objects.all().order_by('-created')

        Questions = Question.objects.all().order_by('-created')

        quizs = []

        for quiz in Questions:

            tags = []

            for tag in quiz.tags.all():
                #print(tag.lang_name)
                tags.append(tag.lang_name)
                #print(tags)

            item = {
                'quiz_id' : quiz.quiz_id,
                'profile': quiz.profile.profile_pic.url,
                'Full_name' : quiz.profile.full_name,
                'create_date' : localize(quiz.created),
                'title' : quiz.quiz_title,
                #Tags are many
                'tags' : tags,
            }

            quizs.append(item)


    return JsonResponse({'quizs':quizs,'message':'success'})


#Answered questions
def answeredQuiz(request):

    if request.user.is_authenticated:

        current_profile = request.user.profile

        current_profile_tag = Tag.objects.get(user = current_profile)

        all_user_tags = current_profile_tag.tags.all()

        criterion1 = Q(receiver=current_profile)
        criterion2 = Q(accepted=False)

        current_request = Relationship.objects.filter(criterion1 & criterion2)

        current_request_count = Relationship.objects.filter(criterion1 & criterion2).count()

        #print(datetime.datetime.now())

        criterion3 = Q(tags__in = all_user_tags)
        criterion4 = Q(answer__isnull = False)

        Questions = Question.objects.filter(criterion3 & criterion4).distinct().count()

    else:
        Questions = 0
        current_request = 'Cannot Request'
        current_request_count = 0 
    
    context = {
        'Questions': Questions,
        'current_request':current_request,
        'current_request_count':current_request_count
    }

    return render(request, 'ansQuiz.html', context)   #


def load_ans_quizs(request):

    if request.user.is_authenticated:

        current_profile = request.user.profile

        current_profile_tag = Tag.objects.get(user = current_profile)

        all_user_tags = current_profile_tag.tags.all()

        #Questions = Question.objects.all().order_by('-created')

        criterion1 = Q(tags__in = all_user_tags)
        criterion2 = Q(answer__isnull = False)

        Questions = Question.objects.filter(criterion1 & criterion2).distinct().order_by('-created')

        print(Questions)

        quizs = []

        for quiz in Questions:

            tags = []

            for tag in quiz.tags.all():
                #print(tag.lang_name)
                tags.append(tag.lang_name)
                #print(tags)

            item = {
                'quiz_id' : quiz.quiz_id,
                'profile': quiz.profile.profile_pic.url,
                'Full_name' : quiz.profile.full_name,
                'create_date' : localize(quiz.created),
                'title' : quiz.quiz_title,
                #Tags are many
                'tags' : tags,
            }

            quizs.append(item)

            #return JsonResponse({'quizs':quizs,'message':'success'})    

    else:

        # current_profile = request.user.profile

        # current_profile_tag = Tag.objects.get(user = current_profile)

        # all_user_tags = current_profile_tag.tags.all()

        # #Questions = Question.objects.all().order_by('-created')

        Questions = Question.objects.all().order_by('-created')

        quizs = []

        for quiz in Questions:

            tags = []

            for tag in quiz.tags.all():
                #print(tag.lang_name)
                tags.append(tag.lang_name)
                #print(tags)

            item = {
                'quiz_id' : quiz.quiz_id,
                'profile': quiz.profile.profile_pic.url,
                'Full_name' : quiz.profile.full_name,
                'create_date' : localize(quiz.created),
                'title' : quiz.quiz_title,
                #Tags are many
                'tags' : tags,
            }

            quizs.append(item)


    return JsonResponse({'quizs':quizs,'message':'success'})


#Unanswered part

def unansweredQuiz(request):

    if request.user.is_authenticated:

        current_profile = request.user.profile

        current_profile_tag = Tag.objects.get(user = current_profile)

        all_user_tags = current_profile_tag.tags.all()

        criterion1 = Q(receiver=current_profile)
        criterion2 = Q(accepted=False)

        current_request = Relationship.objects.filter(criterion1 & criterion2)

        current_request_count = Relationship.objects.filter(criterion1 & criterion2).count()

        #print(datetime.datetime.now())

        criterion3 = Q(tags__in = all_user_tags)
        criterion4 = Q(answer__isnull = True)

        Questions = Question.objects.filter(criterion3 & criterion4).distinct().count()

    else:
        Questions = 0
        current_request = 'Cannot Request'
        current_request_count = 0 
    
    context = {
        'Questions': Questions,
        'current_request':current_request,
        'current_request_count':current_request_count
    }

    return render(request, 'unansQuiz.html', context)   #


def load_unans_quizs(request):

    if request.user.is_authenticated:

        current_profile = request.user.profile

        current_profile_tag = Tag.objects.get(user = current_profile)

        all_user_tags = current_profile_tag.tags.all()

        #Questions = Question.objects.all().order_by('-created')

        criterion1 = Q(tags__in = all_user_tags)
        criterion2 = Q(answer__isnull = True)

        Questions = Question.objects.filter(criterion1 & criterion2).distinct().order_by('-created')

        print(Questions)

        quizs = []

        for quiz in Questions:

            tags = []

            for tag in quiz.tags.all():
                #print(tag.lang_name)
                tags.append(tag.lang_name)
                #print(tags)

            item = {
                'quiz_id' : quiz.quiz_id,
                'profile': quiz.profile.profile_pic.url,
                'Full_name' : quiz.profile.full_name,
                'create_date' : localize(quiz.created),
                'title' : quiz.quiz_title,
                #Tags are many
                'tags' : tags,
            }

            quizs.append(item)

            #return JsonResponse({'quizs':quizs,'message':'success'})    

    else:

        # current_profile = request.user.profile

        # current_profile_tag = Tag.objects.get(user = current_profile)

        # all_user_tags = current_profile_tag.tags.all()

        # #Questions = Question.objects.all().order_by('-created')

        Questions = Question.objects.all().order_by('-created')

        quizs = []

        for quiz in Questions:

            tags = []

            for tag in quiz.tags.all():
                #print(tag.lang_name)
                tags.append(tag.lang_name)
                #print(tags)

            item = {
                'quiz_id' : quiz.quiz_id,
                'profile': quiz.profile.profile_pic.url,
                'Full_name' : quiz.profile.full_name,
                'create_date' : localize(quiz.created),
                'title' : quiz.quiz_title,
                #Tags are many
                'tags' : tags,
            }

            quizs.append(item)


    return JsonResponse({'quizs':quizs,'message':'success'})


#This will contain individual question details

def quizDetail(request, pk):

    #The question details
    individualQuiz = Question.objects.get(quiz_id = pk)

    #The images of the question
    the_gallery = Gallery.objects.filter(question = individualQuiz)

    #Get all the answers to this individual question
    answers = Answer.objects.filter(question = individualQuiz).order_by('-created')

    #Lets get images related to an individual answer

    current = request.user.profile

    current_receiver = individualQuiz.profile

    #Get the room where the user is either receiver or sender

    print(current_receiver)
    print(current)

    #NB
    #POSSIBILITY WHERE THE CURRENT_RECEIVER IS THE ONE WHO HAS SENT THE REQUEST


    #existing_rel = Relationship.objects.get(sender=current,receiver=current_receiver)

    if Relationship.objects.filter(Q(sender=current,receiver=current_receiver) | Q(sender=current_receiver,receiver=current)).exists():

        existing_rel = Relationship.objects.filter(Q(sender=current,receiver=current_receiver) | Q(sender=current_receiver,receiver=current)).exists()

        existing_rel_status = Relationship.objects.get(Q(sender=current,receiver=current_receiver) | Q(sender=current_receiver,receiver=current))


    else:
        existing_rel = Relationship.objects.filter(Q(sender=current,receiver=current_receiver) | Q(sender=current_receiver,receiver=current)).exists()

        existing_rel_status = ''



    if Room.objects.filter(Q(sender=current,receiver=current_receiver) | Q(sender=current_receiver,receiver=current)).exists():

        room_exist = Room.objects.filter(Q(sender=current,receiver=current_receiver) | Q(sender=current_receiver,receiver=current)).exists()

        room = Room.objects.get(Q(sender=current,receiver=current_receiver) | Q(sender=current_receiver,receiver=current))

    else:

        room_exist = Room.objects.filter(Q(sender=current,receiver=current_receiver) | Q(sender=current_receiver,receiver=current)).exists()

        room = ''

    print(existing_rel)
   

    context = {
        'QDetail': individualQuiz,
        'the_gallery':the_gallery,

        #test if the current user and the owner of the question are related
        'is_related_sent':existing_rel,
        'existing_rel_status':existing_rel_status,

        #answers
        'answers':answers,
        #'new_gallery_answers':new_gallery_answers

        #Lets pass room
        'room':room,

        'room_exist':room_exist

    }

    print(individualQuiz)

    return render(request, 'quizDetail.html',context)  


#Here we post the answer

def postAnswer(request):

    #Now lets save the incomming answers

    #Here we get the current user
    user = request.user

    theUser = Profile.objects.get(user=user)

    #The question the answer belongs to

    #lets get the data uploaded

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        print(request.POST)

        #The question this answer belong to
        question = int(request.POST.get('question'))

        intendQuiz = Question.objects.get(quiz_id=question)

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

        #Now we create the answer

        new_answer = Answer.objects.create(

            #The intent question
            question = intendQuiz,

            #The profile that has posted the answer
            profile = theUser,

            #The body of the answer
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


        #Now lets loop through the pictures belonging to the question

        #Then we create the gallery

        for galley in gallerys:
            Answergallery.objects.create(

                #The question owning the gallery
                answer = new_answer,
                
                #The pictures 
                body_media = galley

            )


    return JsonResponse({'status':'success'})

#This is the fuction for my questions page

def myQuizs(request):

    if request.user.is_authenticated:

        me = request.user.profile

        my_questions = Question.objects.filter(profile = me).all().order_by('-created')

        print(my_questions)

        current_profile = request.user.profile

        criterion1 = Q(receiver=current_profile)
        criterion2 = Q(accepted=False)

        current_request = Relationship.objects.filter(criterion1 & criterion2)

        current_request_count = Relationship.objects.filter(criterion1 & criterion2).count()

    else:
        current_request = 'Cannot Request'
        current_request_count = 0 

    context = {
        'quizs':my_questions,
        'current_request':current_request,
        'current_request_count':current_request_count
    }

    return render(request, 'myQuizs.html',context)    

#My questions details

def myQuizDetail(request, pk):

    if request.user.is_authenticated:

        the_question = Question.objects.get(quiz_id = pk)

        the_gallery = Gallery.objects.filter(question = the_question).all().order_by('-created')

        answers = Answer.objects.filter(question = the_question).all().order_by('-created')

        current_profile = request.user.profile

        criterion1 = Q(receiver=current_profile)
        criterion2 = Q(accepted=False)

        current_request = Relationship.objects.filter(criterion1 & criterion2)

        current_request_count = Relationship.objects.filter(criterion1 & criterion2).count()

    else:
        current_request = 'Cannot Request'
        current_request_count = 0 

    context = {
        'the_question':the_question,
        'the_gallery':the_gallery,
        'answers':answers,
        'current_request':current_request,
        'current_request_count':current_request_count
    }

    return render(request, 'myQuizDetail.html',context)


#My asnwers
def myAnswers(request):

    if request.user.is_authenticated:

        me = request.user.profile

        my_answers = Answer.objects.filter(profile = me).all().order_by('-created')

        print(my_answers)

        current_profile = request.user.profile

        criterion1 = Q(receiver=current_profile)
        criterion2 = Q(accepted=False)

        current_request = Relationship.objects.filter(criterion1 & criterion2)

        current_request_count = Relationship.objects.filter(criterion1 & criterion2).count()

    else:
        current_request = 'Cannot Request'
        current_request_count = 0 

    context = {
        'answers':my_answers,
        'current_request':current_request,
        'current_request_count':current_request_count
    }

    return render(request, 'myAnswers.html',context)    