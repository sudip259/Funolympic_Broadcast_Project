import imp
from xml.etree.ElementTree import Comment
from django.contrib import admin
from funolympic.models import Game,MatchHighlight,LiveGameComment,MatchHighlightComment

# Register your models here.
admin.site.register(Game)
admin.site.register(MatchHighlight)
admin.site.register(LiveGameComment)
admin.site.register(MatchHighlightComment)