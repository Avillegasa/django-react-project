from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from sklearn.ensemble import RandomForestRegressor 
from sklearn.tree import DecisionTreeRegressor #arbol de decision
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum, F
import pandas as pd
from datetime import datetime, timedelta

from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from .analytics_models import HistoricalData, ComisosData
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
            # Obtener datos históricos
            data = ComisosData.objects.all()
            if not data.exists():
                return Response({"error": "No hay datos disponibles en la tabla ComisosData."}, status=400)

            df = pd.DataFrame(list(data.values()))
            required_columns = ['quantity', 'value', 'date', 'category']
            missing_columns = [col for col in required_columns if col not in df.columns]
            if missing_columns:
                return Response({"error": f"Faltan columnas: {', '.join(missing_columns)}"}, status=400)

            # Asegurarnos de que la columna date sea de tipo datetime
            df['date'] = pd.to_datetime(df['date'])
            df['timestamp'] = df['date'].astype(int) // 10**9

            # Agrupar datos si no hay valores en 'quantity'
            if df['quantity'].isnull().all():
                df['quantity'] = df.groupby(['category', 'date'])['value'].transform('sum')

            X = df[['timestamp', 'value']]  # Características
            y = df['quantity']  # Objetivo

            # Escalado de características
            scaler = StandardScaler()
            X_scaled = scaler.fit_transform(X)

            # Usar un modelo de Árbol de Decisión
            model = DecisionTreeRegressor(random_state=42)
            model.fit(X_scaled, y)

            # Realizar predicción
            future_date = pd.Timestamp.now() + pd.Timedelta(days=30)  # Predicción a 30 días
            future_timestamp = int(future_date.timestamp())
            average_value = df['value'].mean()

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
        # Obtener los parámetros de la solicitud
        category = request.query_params.get('category', None)
        period = request.query_params.get('period', 'month')  # Periodo predeterminado: mes

        if not category:
            return Response({"error": "Se requiere un parámetro de categoría."}, status=400)

        # Validar períodos disponibles
        valid_periods = ['month', 'semester', 'year']
        if period not in valid_periods:
            return Response({"error": f"Período no válido. Use {', '.join(valid_periods)}."}, status=400)

        # Filtrar datos históricos por categoría
        data = ComisosData.objects.filter(category=category).values('date', 'quantity', 'value').order_by('date')
        if not data.exists():
            return Response({"error": f"No hay datos disponibles para la categoría {category}."}, status=404)

        # Convertir datos históricos a DataFrame
        df = pd.DataFrame(data)
        df['date'] = pd.to_datetime(df['date'])
        df['timestamp'] = df['date'].astype(int) // 10**9  # Convertir la fecha en timestamp

        # Verificar si la columna quantity está vacía
        if df['quantity'].isnull().all():
            df['quantity'] = df['value']  # Si no hay valores en 'quantity', usar 'value' como base

        # Entrenar modelo de predicción
        X = df[['timestamp', 'value']]
        y = df['quantity']
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_scaled, y)

        # Establecer los días para cada período
        steps = {
            'month': 30,  # 1 mes
            'semester': 180,  # 6 meses
            'year': 365  # 1 año
        }

        # Predicción solo para el siguiente período
        future_date = datetime.now() + timedelta(days=steps[period])
        future_timestamp = int(future_date.timestamp())
        average_value = df['value'].mean()
        future_scaled = scaler.transform([[future_timestamp, average_value]])
        predicted_quantity = model.predict(future_scaled)[0]

        # Formatear la predicción
        prediction = {
            "date": future_date.strftime('%Y-%m-%d'),
            "quantity": max(0, predicted_quantity)  # Asegurar que no haya valores negativos
        }

        # Formatear los datos históricos
        historical_data = df[['date', 'quantity']].to_dict(orient='records')

        # Respuesta combinada con datos históricos y predicciones
        return Response({
            "category": category,
            "historical_data": historical_data,
            "predicted_data": [prediction]  # Solo se incluye una predicción para el período seleccionado
        })
