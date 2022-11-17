from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Friend)
admin.site.register(Relationship)
admin.site.register(Room)
admin.site.register(Message)