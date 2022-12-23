from django.urls import path
from wishlist.views import WishListCreateView


# app level api routing
urlpatterns = [
    path('api/wish_list/', WishListCreateView.as_view({'get': 'list','post': 'create'}), name='wish-list'),
    path("api/wish_list/<int:pk>/", WishListCreateView.as_view({"get": "retrieve",'delete':'destroy'}), name="wishlist-detail"),
]