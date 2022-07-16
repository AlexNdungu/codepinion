import re
from django.shortcuts import render

# Create your views here.

#This is the page to be inherited
def index(request):
    return render(request, 'index.html')

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