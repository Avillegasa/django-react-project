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
