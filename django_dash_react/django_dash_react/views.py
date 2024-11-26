from django.shortcuts import render
import os

def index(request):
    return render(request, 'index.html')

#def index(request): 
    #Renderiza el archivo `index.html` desde la carpeta `static` generada por Vite
   #return render (request, 'index.html')