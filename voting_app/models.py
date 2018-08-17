from django.db import models

# Create your models here.


class Product(models.Model):
    title = models.CharField(max_length=150, unique=True)
    description  = models.CharField(max_length=200, blank=True)
    votes = models.PositiveIntegerField(default=0)
    author = models.CharField(max_length=50, default='Chris')

    def __str__(self):
        return self.title