from wishlist.models import WishList
from wishlist.serializers import WishListSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class WishListCreateView(viewsets.ModelViewSet):
    queryset = WishList.objects.all()
    serializer_class = WishListSerializer


    

