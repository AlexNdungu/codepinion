from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Language)
admin.site.register(Framework)
admin.site.register(Profile)
admin.site.register(Tag)