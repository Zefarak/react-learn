from django.db import models


class Timer(models.Model):
    title = models.CharField(max_length=150)
    project = models.CharField(max_length=150)
    elapsed = models.PositiveIntegerField()
    runningSince = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title
