from django.db import models
from datetime import datetime 

# Create your models here.

class Timer(models.Model):
    id_timer = models.AutoField(primary_key=True)
    initial_date = models.DateTimeField(default=datetime.now)
    time_seconds = models.IntegerField(default=0)
    end_date = models.DateTimeField(default=datetime.now)
    
    class Meta:
        managed = True
        db_table = 'timer'
        verbose_name = 'Timer'
        verbose_name_plural = 'Timers'


