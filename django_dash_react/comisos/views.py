from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from .serializers import (
    OperacionGeneralSerializer,
    MercaderiaSerializer,
    VehiculoSerializer,
    IncineradoSerializer,
    GruaSerializer
)

# Vista basada en función para obtener todos los comisos
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_comisos(request):
    # Obtener los datos de cada categoría
    operacion_general = OperacionGeneralSerializer(
        OperacionGeneral.objects.all(), many=True).data
    mercaderia = MercaderiaSerializer(Mercaderia.objects.all(), many=True).data
    vehiculo = VehiculoSerializer(Vehiculo.objects.all(), many=True).data
    incinerado = IncineradoSerializer(Incinerado.objects.all(), many=True).data
    grua = GruaSerializer(Grua.objects.all(), many=True).data

    # Retornar datos agrupados
    return Response({
        "operacion_general": operacion_general,
        "mercaderia": mercaderia,
        "vehiculo": vehiculo,
        "incinerado": incinerado,
        "grua": grua,
    })


# Vista basada en clases para OperacionGeneral
class OperacionGeneralListCreateView(generics.ListCreateAPIView):
    queryset = OperacionGeneral.objects.all()
    serializer_class = OperacionGeneralSerializer
    permission_classes = [IsAuthenticated]


# Vista basada en clases para Mercaderia
class MercaderiaListCreateView(generics.ListCreateAPIView):
    queryset = Mercaderia.objects.all()
    serializer_class = MercaderiaSerializer
    permission_classes = [IsAuthenticated]


# Vista basada en clases para Vehiculo
class VehiculoListCreateView(generics.ListCreateAPIView):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer
    permission_classes = [IsAuthenticated]


# Vista basada en clases para Incinerado
class IncineradoListCreateView(generics.ListCreateAPIView):
    queryset = Incinerado.objects.all()
    serializer_class = IncineradoSerializer
    permission_classes = [IsAuthenticated]


# Vista basada en clases para Grua
class GruaListCreateView(generics.ListCreateAPIView):
    queryset = Grua.objects.all()
    serializer_class = GruaSerializer
    permission_classes = [IsAuthenticated]
