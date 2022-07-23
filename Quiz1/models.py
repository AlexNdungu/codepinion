from pyexpat import model
from django.db import models
from Code1.models import *
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User


# Create your models here.

class Question(models.Model):

    quiz_id = models.AutoField(primary_key=True)
     
    #One profile many questions
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    #one question many tags
    tags = models.ManyToManyField(Language, blank=True)

    #This is the question titles
    quiz_title = models.CharField(max_length=100, verbose_name='Question Title')

    #THE QUESTION ITSELF

    #The question body

    body = RichTextField()


    #Code Block Sections
    code_1 = models.TextField(verbose_name='CodeBlock 1')
    code_2 = models.TextField(verbose_name='CodeBlock 2')
    code_3 = models.TextField(verbose_name='CodeBlock 3')
    code_4 = models.TextField(verbose_name='CodeBlock 4')
    code_5 = models.TextField(verbose_name='CodeBlock 5')


    #Images sections

    body_media = models.ImageField(upload_to='Tried', verbose_name='Body Media')

    #WHAT THE USER HAS TRIED

    #The tried body

    tried_body = RichTextField()

    #Code Block Sections
    code_11 = models.TextField(verbose_name='CodeBlock 11')
    code_22 = models.TextField(verbose_name='CodeBlock 22')
    code_33 = models.TextField(verbose_name='CodeBlock 33')
    code_44 = models.TextField(verbose_name='CodeBlock 44')
    code_55 = models.TextField(verbose_name='CodeBlock 55')


    #The tried media

    tried_media = models.ImageField(upload_to='Tried', verbose_name='Tried Media')


    #Users That Have Viewed The Question
    quiz_views = models.ManyToManyField(Profile, blank=True, related_name="views", verbose_name='Question Views')
    #Users That have upvoted the question
    quiz_votes = models.ManyToManyField(Profile, blank=True, related_name='votes', verbose_name='Question Votes')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)