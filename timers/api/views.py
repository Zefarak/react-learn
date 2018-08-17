from rest_framework import generics
from .serializers import TimerSerializer, Timer


class TimerApiView(generics.ListCreateAPIView):
    serializer_class = TimerSerializer
    queryset = Timer.objects.all()


class TimerApiCreate(generics.CreateAPIView):
    serializer_class = TimerSerializer
    queryset = Timer.objects.all()