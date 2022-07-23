from unicodedata import name
from django.urls import path
from . import views

urlpatterns = [
    #Base Template
    path('', views.index, name='index'),

    #Ask question page
    path('Ask/', views.Ask, name='Add_Question'),

    #This is the new questions url
    path('New Questions/', views.newQuiz, name='New_questions'),

    #This is the question detail path
    path('Question Details/',views.quizDetail, name='question_detail'),

    #This is my questions url
    path('My questions/', views.myQuizs, name='my_questions'),

    #This is my questions details
    path('My Questions Details/', views.myQuizDetail, name='mt_quiz_details')

]