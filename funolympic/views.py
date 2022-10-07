#views.py
from rest_framework import generics
from funolympic.models import Game,MatchHighlight,LiveGameComment, MatchHighlightComment
from funolympic.serializers import CommentMatchHighlightSerializer, GameSerializer,MatchHighlightsSerializer,CommentLiveGameSerializer,PostLiveGameCommentSerializer, PostMatchHighlightCommentSerializer
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework import filters

class ListGameView(generics.ListAPIView):
    parser_classes = [MultiPartParser, FormParser]
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['game_title', 'team1','team2']

class GetGameByIdView(generics.RetrieveAPIView):
    parser_classes = [MultiPartParser, FormParser]
    queryset = Game.objects.all()
    serializer_class = GameSerializer    

class ListMatchHighlightView(generics.ListAPIView):
    parser_classes = [MultiPartParser, FormParser]
    queryset = MatchHighlight.objects.all()
    serializer_class = MatchHighlightsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['game_title', 'team1','team2',]

class GetMatchHighlightByIdView(generics.RetrieveAPIView):
    parser_classes = [MultiPartParser, FormParser]
    queryset = MatchHighlight.objects.all()
    serializer_class = MatchHighlightsSerializer    

class ListLiveGameCommentsView(generics.ListAPIView):
    pagination_class = None
    queryset = LiveGameComment.objects.all()
    serializer_class = CommentLiveGameSerializer    

class PostLiveGameCommentAPIView(generics.CreateAPIView):
    queryset = LiveGameComment.objects.all()
    serializer_class = PostLiveGameCommentSerializer      

class ListMatchHighlightCommentView(generics.ListAPIView):
    pagination_class = None
    queryset = MatchHighlightComment.objects.all()
    serializer_class = CommentMatchHighlightSerializer    

class PostMatchHighlightCommentAPIView(generics.CreateAPIView):
    queryset = MatchHighlightComment.objects.all()
    serializer_class = PostMatchHighlightCommentSerializer     