from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua
from rest_framework import generics, status 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from sklearn.ensemble import RandomForestRegressor 
from sklearn.tree import DecisionTreeRegressor  # Árbol de decisión
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from rest_framework.decorators import api_view, permission_classes
from .serializers import OperacionGeneralSerializer, MercaderiaSerializer, VehiculoSerializer, IncineradoSerializer, GruaSerializer
from django.db.models import Sum, F
import pandas as pd
from datetime import datetime, timedelta

from .serializers import (
    OperacionGeneralSerializer,
    MercaderiaSerializer,
    VehiculoSerializer,
    IncineradoSerializer,
    GruaSerializer,
)
from .analytics_models import HistoricalData, ComisosData

@api_view(['GET'])
def get_all_comisos(request):
    try:
        operacion_general = OperacionGeneral.objects.all()
        mercaderia = Mercaderia.objects.all()
        vehiculo = Vehiculo.objects.all()
        incinerado = Incinerado.objects.all()
        grua = Grua.objects.all()

        data = {
            "operacion_general": OperacionGeneralSerializer(operacion_general, many=True).data,
            "mercaderia": MercaderiaSerializer(mercaderia, many=True).data,
            "vehiculo": VehiculoSerializer(vehiculo, many=True).data,
            "incinerado": IncineradoSerializer(incinerado, many=True).data,
            "grua": GruaSerializer(grua, many=True).data,
        }

        # Transformar los datos para unificar el campo 'detalle'
        for key, items in data.items():
            for item in items:
                if key == "operacion_general":
                    item["detalle"] = item.pop("detalle_operacion")
                elif key == "mercaderia":
                    item["detalle"] = item.pop("detalle_mercaderia")
                elif key == "vehiculo":
                    item["detalle"] = item.pop("tipo_vehiculo")
                elif key == "incinerado":
                    item["detalle"] = item.pop("tipo_incinerado")
                elif key == "grua":
                    item["detalle"] = item.pop("mercaderia_transportada")

        return Response(data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


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


# Vista para registrar comisos por categoría
class RegistrarComiso(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data
        categoria = data.get('categoria')  # Recibimos la categoría del comiso
        detalle = data.get('detalle')  # Detalle del comiso
        anio = data.get('anio')
        mes = data.get('mes')
        cantidad = data.get('cantidad', 0)
        semana = data.get('semana')  # Semana seleccionada

        # Verificar la semana seleccionada
        semana_campo = None
        if semana == "1":
            semana_campo = "semana_1"
        elif semana == "2":
            semana_campo = "semana_2"
        elif semana == "3":
            semana_campo = "semana_3"
        elif semana == "4":
            semana_campo = "semana_4"
        elif semana == "5":
            semana_campo = "semana_5"

        if not semana_campo:
            return Response({"error": "Semana no válida."}, status=status.HTTP_400_BAD_REQUEST)

        # Dependiendo de la categoría, se crea un objeto del modelo correspondiente
        try:
            if categoria == 'operacion-general':
                registro = OperacionGeneral.objects.create(
                    detalle_operacion=detalle,
                    anio=anio,
                    mes=mes,
                    cantidad=cantidad,
                    **{semana_campo: cantidad}  # Asignar el valor de cantidad a la semana seleccionada
                )
            elif categoria == 'mercaderia':
                registro = Mercaderia.objects.create(
                    tipo_mercaderia=detalle,
                    anio=anio,
                    mes=mes,
                    cantidad=cantidad,
                    **{semana_campo: cantidad}
                )
            elif categoria == 'vehiculo':
                registro = Vehiculo.objects.create(
                    tipo_vehiculo=detalle,
                    anio=anio,
                    mes=mes,
                    cantidad=cantidad,
                    **{semana_campo: cantidad}
                )
            elif categoria == 'incinerado':
                registro = Incinerado.objects.create(
                    tipo_incinerado=detalle,
                    anio=anio,
                    mes=mes,
                    cantidad=cantidad,
                    **{semana_campo: cantidad}
                )
            elif categoria == 'grua':
                registro = Grua.objects.create(
                    mercaderia_transportada=detalle,
                    anio=anio,
                    mes=mes,
                    cantidad=cantidad,
                    **{semana_campo: cantidad}
                )
            else:
                return Response({"error": "Categoría no válida."}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "Registro exitoso", "id": registro.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Vista para las predicciones de comisos
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
