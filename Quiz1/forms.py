from .models import *
from django.forms import ModelForm

class QuizForm(ModelForm):

    class Meta:
        model = Question
        fields = ['body']