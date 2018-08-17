from rest_framework import generics
from .serializers import Product, ProductSerializer


class ProductApiView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
