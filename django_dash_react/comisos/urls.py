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
    path('operacion-general/', OperacionGeneralListCreateView.as_view(), name='operacion-general'),
    path('mercaderia/', MercaderiaListCreateView.as_view(), name='mercaderia'),
    path('vehiculo/', VehiculoListCreateView.as_view(), name='vehiculo'),
    path('incinerado/', IncineradoListCreateView.as_view(), name='incinerado'),
    path('grua/', GruaListCreateView.as_view(), name='grua'),
    path('trends/predict/', PredictView.as_view(), name='predict-data'),
    path('trends/category/', CategoryTrendView.as_view(), name='category-trend'),
    path('all-comisos/', get_all_comisos, name='all-comisos'),
]
    
