# Generated by Django 4.0.3 on 2022-11-21 06:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Code1', '0002_amount_record_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='amount',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Code1.amount'),
        ),
        migrations.AlterField(
            model_name='account',
            name='expiry',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='payment_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='Code1.profile'),
        ),
        migrations.AlterField(
            model_name='record',
            name='amount',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Code1.amount'),
        ),
        migrations.AlterField(
            model_name='record',
            name='expiry',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='payment_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='Code1.profile'),
        ),
    ]