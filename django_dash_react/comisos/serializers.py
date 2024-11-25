from rest_framework import serializers
from .models import OperacionGeneral, Mercaderia, Vehiculo, Incinerado, Grua

class OperacionGeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperacionGeneral
        fields = '__all__'

class MercaderiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mercaderia
        fields = '__all__'

class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = '__all__'

class IncineradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incinerado
        fields = '__all__'

class GruaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grua
        fields = '__all__'
