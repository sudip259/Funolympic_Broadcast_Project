from rest_framework import serializers
from funolympic.models import Game,MatchHighlight,LiveGameComment, MatchHighlightComment
from account.serializers import UserSerializer

class GameSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Game
        fields = ['id','game_title','team1','team2','team1_logo','team2_logo','broadcast_time','broadcast_url','team1_score','team2_score','user']

class MatchHighlightsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = MatchHighlight
        fields = ['id','game_title','team1','team2','team1_logo','team2_logo','highlight_url', 'team1_score','team2_score','user']        

class CommentLiveGameSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    game = GameSerializer()
    class Meta:
        model = LiveGameComment
        fields = ['id','content','user','game','commented_at']

class PostLiveGameCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveGameComment
        fields = ['id','content','user','game']        

class CommentMatchHighlightSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    game = MatchHighlightsSerializer()
    class Meta:
        model = MatchHighlightComment
        fields = ['id','content','user','game','commented_at']

class PostMatchHighlightCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchHighlightComment
        fields = ['id','content','user','game']   
