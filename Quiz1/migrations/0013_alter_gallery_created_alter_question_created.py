# Generated by Django 4.0.3 on 2022-09-10 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Quiz1', '0012_alter_answergallery_answer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]