from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from .serializers import OperacionGeneralSerializer, MercaderiaSerializer, VehiculoSerializer, IncineradoSerializer, GruaSerializer

class OperacionGeneralListCreateView(generics.ListCreateAPIView):
    queryset = OperacionGeneral.objects.all()
    serializer_class = OperacionGeneralSerializer
    permission_classes = [IsAuthenticated]

class MercaderiaListCreateView(generics.ListCreateAPIView):
    queryset = Mercaderia.objects.all()
    serializer_class = MercaderiaSerializer
    permission_classes = [IsAuthenticated]

class VehiculoListCreateView(generics.ListCreateAPIView):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer
    permission_classes = [IsAuthenticated]

class IncineradoListCreateView(generics.ListCreateAPIView):
    queryset = Incinerado.objects.all()
    serializer_class = IncineradoSerializer
    permission_classes = [IsAuthenticated]

class GruaListCreateView(generics.ListCreateAPIView):
    queryset = Grua.objects.all()
    serializer_class = GruaSerializer
    permission_classes = [IsAuthenticated]
