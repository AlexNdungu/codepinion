# Generated by Django 4.0.3 on 2022-09-16 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Room', '0003_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='name',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='room',
            name='slug',
            field=models.SlugField(default=0, unique=True),
            preserve_default=False,
        ),
    ]