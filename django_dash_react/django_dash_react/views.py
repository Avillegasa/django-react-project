from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "users": "/api/users/",
        "comisos": "/api/comisos/",
        "login": "/api/login/",
        "logout": "/api/logout/"
    })
