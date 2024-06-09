from django.db import models

class CreativeWork(models.Model):
    title = models.CharField(unique=True, max_length=255)
    page_url = models.URLField()
    thumbnail_url = models.URLField(blank=True, null=True)
    source = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.title