from django.db import models

class OperacionGeneral(models.Model):
    detalle_operacion = models.CharField(max_length=255)
    anio = models.IntegerField()
    mes = models.CharField(max_length=20)
    semana_1 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_2 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_3 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_4 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_5 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.detalle_operacion} - {self.anio}/{self.mes}"

class Mercaderia(models.Model):
    tipo_mercaderia = models.CharField(max_length=255)
    anio = models.IntegerField()
    mes = models.CharField(max_length=20)
    semana_1 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_2 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_3 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_4 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_5 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.tipo_mercaderia} - {self.anio}/{self.mes}"

class Vehiculo(models.Model):
    tipo_vehiculo = models.CharField(max_length=255)
    anio = models.IntegerField()
    mes = models.CharField(max_length=20)
    semana_1 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_2 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_3 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_4 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_5 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.tipo_vehiculo} - {self.anio}/{self.mes}"

class Incinerado(models.Model):
    tipo_incinerado = models.CharField(max_length=255)
    anio = models.IntegerField()
    mes = models.CharField(max_length=20)
    semana_1 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_2 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_3 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_4 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_5 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.tipo_incinerado} - {self.anio}/{self.mes}"

class Grua(models.Model):
    mercaderia_transportada = models.CharField(max_length=255)
    anio = models.IntegerField()
    mes = models.CharField(max_length=20)
    semana_1 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_2 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_3 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_4 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    semana_5 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.mercaderia_transportada} - {self.anio}/{self.mes}"
