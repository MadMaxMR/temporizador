from multiprocessing import context
from django.shortcuts import render
from .models import Timer
from datetime import datetime 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def index(request):
    return render(request, 'index.html')

def empieza_gratis_index(request):
    return render(request, 'empieza-gratis/index.html')

@csrf_exempt
def timer(request):
    timer = Timer.objects.all().last()
    context = {
        'initial_date': timer.initial_date.strftime("%Y-%m-%d %H:%M:%S"),
        'end_date': timer.end_date.strftime("%Y-%m-%d %H:%M:%S"),
        'now': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    now =datetime.strptime(context['now'], "%Y-%m-%d %H:%M:%S").timestamp()

    initial_date_in_seconds = datetime.strptime(context['initial_date'], "%Y-%m-%d %H:%M:%S").timestamp()
    end_date_in_seconds = datetime.strptime(context['end_date'], "%Y-%m-%d %H:%M:%S").timestamp()

    if now >= initial_date_in_seconds:
        remaining_time = end_date_in_seconds - now
        if remaining_time < 0:
            return JsonResponse({'data': 'stop'})
        else:
            return JsonResponse({'data': remaining_time})
    else:
        return JsonResponse({'data':'stop'})

