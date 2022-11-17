from unicodedata import name
from django.urls import path
from . import views

urlpatterns = [
    #Base Template
    #path('', views.index, name='index'),

    #logout
    path('logout/',views.user_logout,name='logout'),

    path('index/', views.index, name='index'),

    #Json Accept friend request
    path('accept/',views.Aindex, name='accept'),

    #Decline invite
    path('decline/',views.Dindex, name='Decline'),

    #Ask question page
    path('Ask/', views.Ask, name='Add_Question'),

    #This is the ml part
    path('search/', views.search, name='search_engine'),

    path('minisearch/', views.miniSearch, name='miniSearch_engine'),

    #This will handle the posting of question
    path('greatForm/', views.greatForm, name='greatForm'),

    #This is the new questions url
    path('', views.newQuiz, name='New_questions'),

    #Here we get all the question suing js and json
    path('allQuestions/',views.load_quizs, name='all_quiz'),

    #The answered question
    path('allAnsweredQuiz/', views.answeredQuiz, name='all_ans_quiz'),

    #load all answered question
    path('loadAnswered/', views.load_ans_quizs, name='loadAnsQuizs'),

    #The unasnswered
    path('allUnansweredQuiz/', views.unansweredQuiz, name='all_unans_quiz'),

    #load all answered question
    path('loadUnnswered/', views.load_unans_quizs, name='loadUnAnsQuizs'),

    #This is the question detail path
    path('Question_Detail/<pk>/',views.quizDetail, name='question_detail'),

    #This is the path to receive the answers
    path('theAnswers/', views.postAnswer, name='answers_post'),

    #This is my questions url
    path('My_Questions/', views.myQuizs, name='my_questions'),

    #This is my questions details
    path('My_Questions_Details/', views.myQuizDetail, name='mt_quiz_details')

]