from django.contrib import admin
from django.urls import path, include
from voting_app.api.views import ProductApiView
from timers.api.views import TimerApiView, TimerApiCreate


urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('frontend.urls')),
    path('api/products/', ProductApiView.as_view(), name='api_products'),
    path('api/timers/', TimerApiView.as_view(), name='api_timers'),
    path('api/timers/start', TimerApiCreate.as_view(), name='timer_app'),

]
