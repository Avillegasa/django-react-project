from django.urls import path
from .views import (
    OperacionGeneralListCreateView,
    MercaderiaListCreateView,
    VehiculoListCreateView,
    IncineradoListCreateView,
    GruaListCreateView,
    PredictView,
    CategoryTrendView,
    get_all_comisos,  # Nueva vista importada
)

urlpatterns = [
    path('api/operacion-general/', OperacionGeneralListCreateView.as_view(), name='operacion-general'),
    path('api/mercaderia/', MercaderiaListCreateView.as_view(), name='mercaderia'),
    path('api/vehiculo/', VehiculoListCreateView.as_view(), name='vehiculo'),
    path('api/incinerado/', IncineradoListCreateView.as_view(), name='incinerado'),
    path('api/grua/', GruaListCreateView.as_view(), name='grua'),
    path('api/trends/predict/', PredictView.as_view(), name='predict-data'),
    path('api/trends/category/', CategoryTrendView.as_view(), name='category-trend'),
]

