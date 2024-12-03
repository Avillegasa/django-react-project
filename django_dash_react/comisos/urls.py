from django.urls import path
from .views import (
    OperacionGeneralListCreateView,
    MercaderiaListCreateView,
    VehiculoListCreateView,
    IncineradoListCreateView,
    GruaListCreateView,
    PredictView,
    CategoryTrendView,
    get_all_comisos,  # Nueva vista para obtener todos los comisos por categoría
)

urlpatterns = [
    # Rutas para cada tipo de comiso
    path('operacion-general/', OperacionGeneralListCreateView.as_view(), name='operacion-general'),
    path('mercaderia/', MercaderiaListCreateView.as_view(), name='mercaderia'),
    path('vehiculo/', VehiculoListCreateView.as_view(), name='vehiculo'),
    path('incinerado/', IncineradoListCreateView.as_view(), name='incinerado'),
    path('grua/', GruaListCreateView.as_view(), name='grua'),

    # Rutas para predicciones y tendencias
    path('trends/predict/', PredictView.as_view(), name='predict-data'),
    path('trends/category/', CategoryTrendView.as_view(), name='category-trend'),

    # Ruta para obtener todos los comisos según la categoría elegida
    path('comisos/all-comisos/', get_all_comisos, name='all-comisos'),  # Usamos esta ruta para filtrar por categoría
]
