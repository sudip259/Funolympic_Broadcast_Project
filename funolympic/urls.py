from django.urls import path
from funolympic.views import ListGameView, ListMatchHighlightCommentView,ListMatchHighlightView,ListLiveGameCommentsView,PostLiveGameCommentAPIView,GetGameByIdView,GetMatchHighlightByIdView, PostMatchHighlightCommentAPIView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
     path('api/game/', ListGameView.as_view(), name='game'),
     path('api/game/<pk>', GetGameByIdView.as_view(), name='gameid'),
     path('api/match-highlights/', ListMatchHighlightView.as_view(), name='highlights'),
     path('api/match-highlights/<pk>', GetMatchHighlightByIdView.as_view(), name='highlightsid'),
     path('api/live-game-comments/', ListLiveGameCommentsView.as_view(), name='comments'),
     path('api/post-live-game-comments/', PostLiveGameCommentAPIView.as_view(), name='post-comments'),
     path('api/match-highlight-comments/', ListMatchHighlightCommentView.as_view(), name='comments'),
     path('api/post-match-highlight-comments/', PostMatchHighlightCommentAPIView.as_view(), name='post-comments'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

