from django.db import models

class WishList(models.Model):
    json_data = models.JSONField(default=dict)


    