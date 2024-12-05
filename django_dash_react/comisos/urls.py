from django.urls import path
from .views import (
    OperacionGeneralListCreateView,
    MercaderiaListCreateView,
    VehiculoListCreateView,
    IncineradoListCreateView,
    GruaListCreateView,
    RegistrarComiso,
    PredictView,
    CategoryTrendView,
    get_all_comisos,
)

urlpatterns = [
    # Rutas para cada tipo de comiso
    path('operacion-general/', OperacionGeneralListCreateView.as_view(), name='operacion-general'),
    path('mercaderia/', MercaderiaListCreateView.as_view(), name='mercaderia'),
    path('vehiculo/', VehiculoListCreateView.as_view(), name='vehiculo'),
    path('incinerado/', IncineradoListCreateView.as_view(), name='incinerado'),
    path('grua/', GruaListCreateView.as_view(), name='grua'),

    # Ruta para registrar comisos
    path('registrar/', RegistrarComiso.as_view(), name='registrar-comiso'),

    # Rutas para predicciones y tendencias
    path('trends/predict/', PredictView.as_view(), name='predict-data'),
    path('trends/category/', CategoryTrendView.as_view(), name='category-trend'),

    # Ruta para obtener todos los comisos según la categoría elegida
    # path('all/', get_all_comisos, name='all-comisos'),
    path('', get_all_comisos, name='get_all_comisos')
]
