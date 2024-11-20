from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Usar un backend no interactivo para evitar errores
import matplotlib.pyplot as plt

from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from .analytics_models import HistoricalData
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
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación

    def get(self, request):
        # Obtener los datos históricos
        data = HistoricalData.objects.all()
        if not data.exists():
            return Response({"error": "No hay datos históricos disponibles para realizar predicciones."}, status=400)

        # Convertir los datos a un DataFrame de pandas
        df = pd.DataFrame(list(data.values()))

        # Verificar que existan las columnas necesarias
        required_columns = ['quantity', 'value', 'date']
        if not all(col in df.columns for col in required_columns):
            return Response({"error": "Faltan columnas necesarias en los datos históricos."}, status=400)

        # Procesar los datos
        df['date'] = pd.to_datetime(df['date'])
        df['timestamp'] = df['date'].astype(int) // 10**9  # Convertir fechas a timestamp para usar en el modelo

        # Visualización opcional de la relación entre value y quantity
        try:
            plt.scatter(df['value'], df['quantity'])
            plt.xlabel('Value')
            plt.ylabel('Quantity')
            plt.title('Relación entre Value y Quantity')
            plt.savefig('scatter_plot.png')  # Guarda el gráfico como archivo
            plt.close()  # Cierra el gráfico para liberar memoria
        except Exception as e:
            print(f"Error al generar el gráfico: {e}")

        # Seleccionar las características (X) y el objetivo (y)
        X = df[['timestamp', 'value']]
        y = df['quantity']

        # Escalar las características
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        # Entrenar el modelo de regresión lineal
        model = LinearRegression()
        model.fit(X_scaled, y)

        # Calcular el promedio de los valores históricos
        average_value = df['value'].mean()

        # Generar una predicción para una fecha futura
        future_date = pd.Timestamp.now() + pd.Timedelta(days=30)
        future_timestamp = int(future_date.timestamp())
        future_features = pd.DataFrame(
            [[future_timestamp, average_value]],
            columns=['timestamp', 'value']  # Asegura que los nombres de las características coincidan
        )
        future_scaled = scaler.transform(future_features)
        predicted_quantity = model.predict(future_scaled)

        # Responder con la predicción
        return Response({
            "future_date": future_date.strftime('%Y-%m-%d'),
            "predicted_quantity": predicted_quantity[0]
        })
