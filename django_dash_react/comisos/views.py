from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum, F
import pandas as pd

from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from .analytics_models import HistoricalData
from .serializers import (
    OperacionGeneralSerializer,
    MercaderiaSerializer,
    VehiculoSerializer,
    IncineradoSerializer,
    GruaSerializer,
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


# Nueva Vista para Predicciones
class PredictView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            data = HistoricalData.objects.all()
            if not data.exists():
                return Response({"error": "No hay datos disponibles en la tabla comisos_historicaldata."}, status=400)

            df = pd.DataFrame(list(data.values()))
            required_columns = ['quantity', 'value', 'date', 'category']
            missing_columns = [col for col in required_columns if col not in df.columns]
            if missing_columns:
                return Response({"error": f"Faltan columnas: {', '.join(missing_columns)}"}, status=400)

            df['date'] = pd.to_datetime(df['date'])
            df['timestamp'] = df['date'].astype(int) // 10**9

            if (df['quantity'] == 0).all():
                df['quantity'] = df.groupby(['category', 'date'])['value'].transform('sum')

            X = df[['timestamp', 'value']]
            y = df['quantity']

            scaler = StandardScaler()
            X_scaled = scaler.fit_transform(X)

            model = LinearRegression()
            model.fit(X_scaled, y)

            average_value = df['value'].mean()
            future_date = pd.Timestamp.now() + pd.Timedelta(days=30)
            future_timestamp = int(future_date.timestamp())
            future_features = pd.DataFrame([[future_timestamp, average_value]], columns=['timestamp', 'value'])
            future_scaled = scaler.transform(future_features)
            predicted_quantity = model.predict(future_scaled)

            return Response({
                "future_date": future_date.strftime('%Y-%m-%d'),
                "predicted_quantity": round(predicted_quantity[0], 2),
            })

        except Exception as e:
            print("Error al procesar los datos:", str(e))
            return Response({"error": "Ocurrió un error al procesar los datos."}, status=500)


# Vista por Categoría
from django.db.models import Sum, F
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .analytics_models import HistoricalData


class CategoryTrendView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener la categoría de los parámetros de consulta
        category = request.query_params.get('category', None)

        if not category:
            return Response({"error": "Se requiere un parámetro de categoría."}, status=400)

        # Filtrar los datos por categoría
        data = HistoricalData.objects.filter(category=category).values('date').annotate(
            total_quantity=Sum(F('quantity') or 0),
            total_value=Sum(F('value') or 0)
        ).order_by('date')

        if not data.exists():
            return Response({"error": f"No hay datos disponibles para la categoría {category}."}, status=404)

        # Formatear los datos para el frontend
        formatted_data = [
            {
                "date": record["date"].strftime('%Y-%m-%d'),
                "quantity": record["total_quantity"],
                "value": record["total_value"]
            }
            for record in data
        ]

        return Response({"category": category, "data": formatted_data})
