from django.db import models

# Create your models here.
class Members(models.Model):
    name = models.CharField(unique=True, null=False, max_length=500)

    def __str__(self):
        return self.name

class DoorsKnocked(models.Model):
    member = models.ForeignKey(Members, on_delete=models.CASCADE, related_name="DoorsKnocked")
    times = models.IntegerField(default=0)

    def __str__(self):
        return self.member + " -> " + self.times