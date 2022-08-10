from pyexpat import model
from django.db import models
from Code1.models import *
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User


# Create your models here.

#QUESTION MODEL

class Question(models.Model):

    quiz_id = models.AutoField(primary_key=True)
     
    #One profile many questions
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    #one question many tags
    tags = models.ManyToManyField(Language, blank=True)

    #one question many frameworks
    frames = models.ManyToManyField(Framework, blank=True)

    #This is the question titles
    quiz_title = models.CharField(max_length=100, verbose_name='Question Title')

    #THE QUESTION ITSELF

    #The question body

    body = RichTextField()


    #Code Block Sections
    code_1_type = models.CharField(max_length=12, verbose_name='Code 1 Lang', null=True, blank=True)
    code_1 = models.TextField(verbose_name='CodeBlock 1', null=True, blank=True)

    code_2_type = models.CharField(max_length=12, verbose_name='Code 2 Lang', null=True, blank=True)
    code_2 = models.TextField(verbose_name='CodeBlock 2', null=True, blank=True)

    code_3_type = models.CharField(max_length=12, verbose_name='Code 3 Lang', null=True, blank=True)
    code_3 = models.TextField(verbose_name='CodeBlock 3', null=True, blank=True)

    code_4_type = models.CharField(max_length=12, verbose_name='Code 4 Lang', null=True, blank=True)
    code_4 = models.TextField(verbose_name='CodeBlock 4', null=True, blank=True)

    #Users That Have Viewed The Question
    quiz_views = models.ManyToManyField(Profile, blank=True, related_name="views", verbose_name='Question Views')
    #Users That have upvoted the question
    quiz_votes = models.ManyToManyField(Profile, blank=True, related_name='votes', verbose_name='Question Votes')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.quiz_title


#QUESTION GALLERY

class Gallery(models.Model):

    gallery_id = models.AutoField(primary_key=True)

    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    body_media = models.ImageField(upload_to='Tried', verbose_name='Media')

    #update and create date
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.question.quiz_title