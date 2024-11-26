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
    path('api/all-comisos/', get_all_comisos, name='all-comisos'),
]
    

# urlpatterns = [
#     path('operacion-general/', OperacionGeneralListCreateView.as_view(), name='operacion-general-list-create'),
#     path('mercaderia/', MercaderiaListCreateView.as_view(), name='mercaderia-list-create'),
#     path('vehiculo/', VehiculoListCreateView.as_view(), name='vehiculo-list-create'),
#     path('incinerado/', IncineradoListCreateView.as_view(), name='incinerado-list-create'),
#     path('grua/', GruaListCreateView.as_view(), name='grua-list-create'),
#     # Nueva ruta para obtener todos los datos
#     path('all-comisos/', get_all_comisos, name='all-comisos'),
# ]
