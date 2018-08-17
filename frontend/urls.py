from django.urls import path, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from frontend.views import index


urlpatterns = [
    path('', view=index),
    ]