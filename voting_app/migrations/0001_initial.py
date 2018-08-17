# Generated by Django 2.0.5 on 2018-07-22 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, unique=True)),
                ('description', models.CharField(blank=True, max_length=200)),
                ('votes', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]