from django.urls import path
from .views import (
    OperacionGeneralListCreateView,
    MercaderiaListCreateView,
    VehiculoListCreateView,
    IncineradoListCreateView,
    GruaListCreateView
)

urlpatterns = [
    path('operacion-general/', OperacionGeneralListCreateView.as_view(), name='operacion-general-list-create'),
    path('mercaderia/', MercaderiaListCreateView.as_view(), name='mercaderia-list-create'),
    path('vehiculo/', VehiculoListCreateView.as_view(), name='vehiculo-list-create'),
    path('incinerado/', IncineradoListCreateView.as_view(), name='incinerado-list-create'),
    path('grua/', GruaListCreateView.as_view(), name='grua-list-create'),
]
