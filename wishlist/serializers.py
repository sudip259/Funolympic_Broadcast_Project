import json
from rest_framework import serializers
from wishlist.models import WishList

class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = "__all__"

    