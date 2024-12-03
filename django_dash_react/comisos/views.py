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
# Vista para obtener todos los comisos, filtrados por categoría
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_comisos(request):
    category = request.query_params.get('category', None)  # Obtener la categoría desde la URL

    if category:
        # Filtrar los comisos por categoría
        if category == 'operacion_general':
            operacion_general = OperacionGeneral.objects.all()
            detalle = [item.detalle for item in operacion_general]
            operacion_general = OperacionGeneralSerializer(operacion_general, many=True).data
            return Response({"operacion_general": operacion_general, "detalle": detalle})

        elif category == 'mercaderia':
            mercaderia = Mercaderia.objects.all()
            detalle = [item.detalle for item in mercaderia]
            mercaderia = MercaderiaSerializer(mercaderia, many=True).data
            return Response({"mercaderia": mercaderia, "detalle": detalle})

        elif category == 'vehiculo':
            vehiculo = Vehiculo.objects.all()
            detalle = [item.detalle for item in vehiculo]
            vehiculo = VehiculoSerializer(vehiculo, many=True).data
            return Response({"vehiculo": vehiculo, "detalle": detalle})

        elif category == 'incinerado':
            incinerado = Incinerado.objects.all()
            detalle = [item.detalle for item in incinerado]
            incinerado = IncineradoSerializer(incinerado, many=True).data
            return Response({"incinerado": incinerado, "detalle": detalle})

        elif category == 'grua':
            grua = Grua.objects.all()
            detalle = [item.detalle for item in grua]
            grua = GruaSerializer(grua, many=True).data
            return Response({"grua": grua, "detalle": detalle})

        else:
            return Response({"error": "Categoría no válida."}, status=400)

    else:
        # Si no se pasa la categoría, devolver todos los comisos
        operacion_general = OperacionGeneral.objects.all()
        detalle_og = [item.detalle for item in operacion_general]
        operacion_general = OperacionGeneralSerializer(operacion_general, many=True).data

        mercaderia = Mercaderia.objects.all()
        detalle_mer = [item.detalle for item in mercaderia]
        mercaderia = MercaderiaSerializer(mercaderia, many=True).data

        vehiculo = Vehiculo.objects.all()
        detalle_veh = [item.detalle for item in vehiculo]
        vehiculo = VehiculoSerializer(vehiculo, many=True).data

        incinerado = Incinerado.objects.all()
        detalle_inc = [item.detalle for item in incinerado]
        incinerado = IncineradoSerializer(incinerado, many=True).data

        grua = Grua.objects.all()
        detalle_gru = [item.detalle for item in grua]
        grua = GruaSerializer(grua, many=True).data

        return Response({
            "operacion_general": operacion_general, "detalle_og": detalle_og,
            "mercaderia": mercaderia, "detalle_mer": detalle_mer,
            "vehiculo": vehiculo, "detalle_veh": detalle_veh,
            "incinerado": incinerado, "detalle_inc": detalle_inc,
            "grua": grua, "detalle_gru": detalle_gru,
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

        # Dependiendo de la categoría, se crea un objeto del modelo correspondiente
        comiso = None
        if categoria == 'operacion_general':
            operacion_general = OperacionGeneral.objects.create(
                detalle_operacion=data.get('detalle_operacion'),
                anio=anio,
                mes=mes,
                cantidad=cantidad
            )
            comiso = operacion_general
        elif categoria == 'mercaderia':
            mercaderia = Mercaderia.objects.create(
                tipo_mercaderia=data.get('tipo_mercaderia'),
                anio=anio,
                mes=mes,
                cantidad=cantidad
            )
            comiso = mercaderia
        elif categoria == 'vehiculo':
            vehiculo = Vehiculo.objects.create(
                tipo_vehiculo=data.get('tipo_vehiculo'),
                anio=anio,
                mes=mes,
                cantidad=cantidad
            )
            comiso = vehiculo
        elif categoria == 'incinerado':
            incinerado = Incinerado.objects.create(
                tipo_incinerado=data.get('tipo_incinerado'),
                anio=anio,
                mes=mes,
                cantidad=cantidad
            )
            comiso = incinerado
        elif categoria == 'grua':
            grua = Grua.objects.create(
                mercaderia_transportada=data.get('mercaderia_transportada'),
                anio=anio,
                mes=mes,
                cantidad=cantidad
            )
            comiso = grua
        else:
            return Response({"error": "Categoría no válida."}, status=status.HTTP_400_BAD_REQUEST)

        # Se guarda el comiso y se retorna una respuesta exitosa
        if comiso:
            return Response({"message": "Comiso registrado con éxito", "comiso_id": comiso.id}, status=status.HTTP_201_CREATED)

        return Response({"message": "Error al registrar el comiso"}, status=status.HTTP_400_BAD_REQUEST)


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

# class CategoryTrendView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request):
#         category = request.query_params.get('category', None)
#         period = request.query_params.get('period', 'month')  # Período predeterminado: mes

#         if not category:
#             return Response({"error": "Se requiere un parámetro de categoría."}, status=400)

#         valid_periods = ['month', 'semester', 'year']
#         if period not in valid_periods:
#             return Response({"error": f"Período no válido. Use {', '.join(valid_periods)}."}, status=400)

#         # Filtrar datos históricos por categoría
#         data = ComisosData.objects.filter(category=category).values('date', 'quantity', 'value').order_by('date')
#         if not data.exists():
#             return Response({"error": f"No hay datos disponibles para la categoría {category}."}, status=404)

#         df = pd.DataFrame(data)
#         df['date'] = pd.to_datetime(df['date'])
#         df['timestamp'] = df['date'].astype(int) // 10**9  # Convertir la fecha en timestamp

#         if df['quantity'].isnull().all():
#             df['quantity'] = df['value']  # Si no hay valores en 'quantity', usar 'value' como base

#         X = df[['timestamp', 'value']]
#         y = df['quantity']
#         scaler = StandardScaler()
#         X_scaled = scaler.fit_transform(X)
#         model = RandomForestRegressor(n_estimators=100, random_state=42)
#         model.fit(X_scaled, y)

#         steps = {
#             'month': 30,  # 1 mes
#             'semester': 180,  # 6 meses
#             'year': 365  # 1 año
#         }

#         future_date = datetime.now() + timedelta(days=steps[period])
#         future_timestamp = int(future_date.timestamp())
#         average_value = df['value'].mean()
#         future_scaled = scaler.transform([[future_timestamp, average_value]])
#         predicted_quantity = model.predict(future_scaled)[0]

#         prediction = {
#             "date": future_date.strftime('%Y-%m-%d'),
#             "quantity": max(0, predicted_quantity)
#         }

#         return Response(prediction)
