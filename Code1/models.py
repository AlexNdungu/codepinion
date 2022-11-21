from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import User



# Create your models here.

#Class Languages

class Language(models.Model):

    lang_id = models.AutoField(primary_key=True)

    lang_name = models.CharField(max_length=20, verbose_name='Tag')
    lang_icon = models.ImageField(upload_to='Tags', verbose_name='Language Icon')
    lang_desc = models.TextField(verbose_name='Language Description')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.lang_name

    @property
    def language_url(self):
        if self.lang_icon and hasattr(self.lang_icon, 'url'):
            return self.lang_icon.url    



#Class Frameworks

class Framework(models.Model):

    #one language many frameworks
    language = models.ForeignKey(Language, on_delete=models.CASCADE, verbose_name='Programming Language')

    frame_id = models.AutoField(primary_key=True)
    frame_name = models.CharField(max_length=20, verbose_name='Framework Name')
    frame_icon = models.ImageField(upload_to='Frameworks', verbose_name='Framework Icon')
    frame_desc = models.TextField(verbose_name='Language Description')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.frame_name

    @property
    def frame_url(self):
        if self.frame_icon and hasattr(self.frame_icon, 'url'):
            return self.frame_icon.url      


#Profile class

class Profile(models.Model):

    #One profile owned by one user
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    #The Profile class attributes
    profile_id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=20, verbose_name='Full Name')

    bio = models.TextField(verbose_name='Bio')

    profile_pic = models.ImageField(upload_to = 'profiles', default='user.png')
    info_picture = models.ImageField(upload_to = 'infoPicture', default='info.jpg')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.full_name

    @property
    def profile_url(self):
        if self.profile_pic and hasattr(self.profile_pic, 'url'):
            return self.profile_pic.url  

    @property
    def info_url(self):
        if self.info_picture and hasattr(self.info_picture, 'url'):
            return self.info_picture.url            

#Experience Class

#class Experience(models.Model):

    #One experience info owned by one user
    #user = models.OneToOneField(User, on_delete=models.CASCADE)

    #The experience class attributes
    #yrs_of_experience = models.IntegerField(verbose_name='Years Of Experience')


#Class Tags

class Tag(models.Model):

    #Primary key
    tag_id = models.AutoField(primary_key=True)

    #One user has only one tag table
    user = models.OneToOneField(Profile, on_delete=models.CASCADE)

    #many languages can be in many users profile
    tags = models.ManyToManyField(Language, blank=True)

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.full_name



#The prem amount
class Amount(models.Model):

    amount_id = models.AutoField(primary_key=True)  

    amount = models.DecimalField(verbose_name='Amount', max_digits=10, decimal_places=2)

    description = models.TextField(verbose_name='Amount Description')

    period = models.CharField(max_length=10, verbose_name='Period')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.period


#The payment
class Account(models.Model):

    account_id = models.AutoField(primary_key=True)     

    user = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True)

    #Amount payed
    amount = models.ForeignKey(Amount, on_delete=models.CASCADE, null=True)

    #Date the payment
    payment_date = models.DateTimeField(null=True)

    #The expired date
    expiry = models.DateTimeField(null=True)

    active = models.BooleanField(default=False, verbose_name='Active Status')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.full_name

#The records
class Record(models.Model):

    rec_id = models.AutoField(primary_key=True) 

    user = models.OneToOneField(Profile, on_delete=models.CASCADE,null=True)

    amount = models.ForeignKey(Amount, on_delete=models.CASCADE,null=True)

    #Date the payment
    payment_date = models.DateTimeField(null=True)

    expiry = models.DateTimeField(null=True)

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.full_name