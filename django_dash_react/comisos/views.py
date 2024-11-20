from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny  # Asegúrate de cabiar de AllowAny a inau para los tockens
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler  # Escalador de datos
import pandas as pd
import matplotlib.pyplot as plt  # Para visualización opcional

from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from .analytics_models import HistoricalData  # Asegúrate de importar los modelos
from .serializers import (
    OperacionGeneralSerializer,
    MercaderiaSerializer,
    VehiculoSerializer,
    IncineradoSerializer,
    GruaSerializer,
)

# Vistas existentes
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

# Nueva Vista para Predicciones
class PredictView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            # Cargar datos desde la base de datos
            data = HistoricalData.objects.using('default').all()
            if not data.exists():
                return Response({"error": "No hay datos disponibles en la tabla comisos_historicaldata."}, status=400)

            # Convertir los datos a un DataFrame
            df = pd.DataFrame(list(data.values()))

            # Verificar columnas necesarias
            required_columns = ['quantity', 'value', 'date', 'category']
            if not all(col in df.columns for col in required_columns):
                return Response({"error": "Faltan columnas necesarias en los datos."}, status=400)

            # Procesar los datos
            df['date'] = pd.to_datetime(df['date'])
            df['timestamp'] = df['date'].astype(int) // 10**9

            # Generar 'quantity' si es 0
            if (df['quantity'] == 0).all():
                df['quantity'] = df.groupby(['category', 'date'])['value'].transform('sum')

            # Depuración: Verificar los datos procesados
            print("DataFrame con 'quantity' generado:")
            print(df.head())

            # Seleccionar características y objetivo
            X = df[['timestamp', 'value']]
            y = df['quantity']

            # Escalar características
            scaler = StandardScaler()
            X_scaled = scaler.fit_transform(X)

            # Entrenar modelo
            model = LinearRegression()
            model.fit(X_scaled, y)

            # Generar predicción para una fecha futura
            average_value = df['value'].mean()
            future_date = pd.Timestamp.now() + pd.Timedelta(days=30)
            future_timestamp = int(future_date.timestamp())
            future_features = pd.DataFrame(
                [[future_timestamp, average_value]],
                columns=['timestamp', 'value']
            )
            future_scaled = scaler.transform(future_features)
            predicted_quantity = model.predict(future_scaled)

            # Responder con la predicción
            return Response({
                "future_date": future_date.strftime('%Y-%m-%d'),
                "predicted_quantity": predicted_quantity[0]
            })

        except Exception as e:
            print("Error al procesar los datos:", str(e))
            return Response({"error": "Ocurrió un error al procesar los datos."}, status=500)
