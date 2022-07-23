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

    profile_pic = models.ImageField(upload_to = 'profiles')
    info_picture = models.ImageField(upload_to = 'infoPicture')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.full_name

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
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)

    #many languages can be in many users profile
    tags = models.ManyToManyField(Language, blank=True)

    def __str__(self):
        return self.user.full_name