from django.db import models
from django.conf import settings

def nameFile(instance, filename):
    return '/'.join(['images', str(instance.game_title), filename])

class Game(models.Model): 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game_title = models.CharField(max_length=100)
    team1 = models.CharField(max_length=100)
    team1_score = models.IntegerField()
    team2 = models.CharField(max_length=100)
    team2_score = models.IntegerField()
    team1_logo = models.ImageField(upload_to=nameFile, blank=True, null=True)
    team2_logo = models.ImageField(upload_to=nameFile, blank=True, null=True)
    broadcast_time = models.DateTimeField()
    broadcast_url = models.URLField()

    def __str__(self):
        return self.game_title

class MatchHighlight(models.Model): 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game_title = models.CharField(max_length=100)
    team1 = models.CharField(max_length=100)
    team1_score = models.IntegerField()
    team2 = models.CharField(max_length=100)
    team2_score = models.IntegerField()
    team1_logo = models.ImageField(upload_to=nameFile, blank=True, null=True)
    team2_logo = models.ImageField(upload_to=nameFile, blank=True, null=True)
    highlight_url = models.URLField()

    def __str__(self):
        return self.game_title

class LiveGameComment(models.Model): 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    content = models.CharField(max_length=300)
    commented_at = models.DateTimeField(auto_now=True)

class MatchHighlightComment(models.Model): 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.ForeignKey(MatchHighlight, on_delete=models.CASCADE)
    content = models.CharField(max_length=300)
    commented_at = models.DateTimeField(auto_now=True)    

