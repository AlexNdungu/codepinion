from django.urls import path
from . import views

urlpatterns = [
    path('Profile/', views.Me, name='profile'),

    #Here we get tags
    path('tags/',views.getTags, name='get_tags'),

    #here we update the profile
    path('profileForm/', views.profileForm, name='updateProfile'),
]