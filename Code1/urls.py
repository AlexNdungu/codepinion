from django.urls import path
from . import views

urlpatterns = [

    #generate the pdfs
    path('payPDF/', views.seePay, name='pdfPay'),

    path('create_prem_rec_pdf/', views.create_seePay, name='create_pdf_rec_prem'),

    path('create_quiz_rec_pdf/', views.create_quiz_pdf, name='create_record_quiz_pdf'),

    path('create_answer_rec_pdf/', views.create_answer_pdf, name='create_record_answer_pdf'),

    path('Profile/', views.Me, name='profile'),

    path('payment/', views.prem, name='premium'),

    #Update payment
    path('updatePrem', views.UpdatePrem, name='update_prem'),
    
    #Share screen
    path('share/', views.shareScreen, name='share'),

    #Here we get tags
    path('tags/',views.getTags, name='get_tags'),

    #here we update the profile
    path('profileForm/', views.profileForm, name='updateProfile'),
]