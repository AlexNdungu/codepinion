from django.urls import path
from . import views

urlpatterns = [
    path('handShake/', views.sendRequest, name='handshake'),

    #Lets create a url to handle all the chats available
    path('chats/<slug:slug>/', views.room, name='room'),

    path('list/', views.rooms, name='rooms'),

    path('videos/',views.videos, name='videos'),

    path('video/<slug:slug>/',views.video, name='video'),

    path('shares/',views.shares, name='shares'),

    path('share/<slug:slug>/',views.share, name='share'),

]

