# Generated by Django 4.1.3 on 2023-02-02 15:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_user_reminder_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='habits',
        ),
    ]
