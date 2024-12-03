from django.db import models

class OperacionGeneral(models.Model):
    DETALLE_OPERACION_CHOICES = [
        ('PATRULLAJES MOVIL', 'PATRULLAJES MOVIL'),
        ('PATRULLAJES A PIE', 'PATRULLAJES A PIE'),
        ('PUESTOS DE CONTROL FIJO', 'PUESTOS DE CONTROL FIJO'),
        ('PUESTO DE CONTROL MOVILES', 'PUESTO DE CONTROL MOVILES'),
        ('RECONOCIMIENTO', 'RECONOCIMIENTO'),
        ('ESCOLTAS', 'ESCOLTAS'),
        ('TRASLADO DE VEHICULOS', 'TRASLADO DE VEHICULOS'),
        ('TRASLADO DE COMISOS O MERCADERIA', 'TRASLADO DE COMISOS O MERCADERIA'),
        ('OPERACIONES LOGISTICAS', 'OPERACIONES LOGISTICAS'),
        ('EVACUACIONES', 'EVACUACIONES'),
        ('ENFRENTAMIENTO CON CONTRABANDISTAS', 'ENFRENTAMIENTO CON CONTRABANDISTAS'),
        ('REUNION CON LOS COMUNARIOS DEL LUGAR', 'REUNION CON LOS COMUNARIOS DEL LUGAR'),
        ('INCINERACION DE VEHICULOS CHUTOS', 'INCINERACION DE VEHICULOS CHUTOS'),
    ]
    
    detalle_operacion = models.CharField(max_length=255, choices=DETALLE_OPERACION_CHOICES)
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
    TIPO_MERCADERIA_CHOICES = [
        ('PERECEDERA', 'PERECEDERA (COMESTIBLES ENLATADOS Y AGRICOLAS)'),
        ('NO_PERECEDERA', 'NO PERECEDERA (LAVADORAS, MICROHONDAS, COMPUTADORAS, TELEVISORES)'),
        ('MERCADERIA_VARIADA', 'MERCADERIA VARIADA (PERECEDERA Y NO PERECEDERA)'),
        ('CARBURANTES', 'CARBURANTES'),
        ('SUSTANCIAS_CONTROLADAS', 'SUSTANCIAS CONTROLADAS'),
        ('DIVISAS', 'DIVISAS'),
        ('VEHICULOS', 'VEHICULOS (COMISADOS INUTILIZADOS E INCINERADOS)'),
    ]
    
    tipo_mercaderia = models.CharField(max_length=255, choices=TIPO_MERCADERIA_CHOICES)
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
    TIPO_VEHICULO_CHOICES = [
        ('LIVIANOS', 'LIVIANOS'),
        ('MEDIANOS', 'MEDIANOS'),
        ('PESADOS', 'PESADOS'),
        ('MOTOCICLETAS', 'MOTOCICLETAS'),
        ('EMBARCACIONES', 'EMBARCACIONES'),
    ]
    
    tipo_vehiculo = models.CharField(max_length=255, choices=TIPO_VEHICULO_CHOICES)
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
    TIPO_INCINERADO_CHOICES = [
        ('VEHICULOS_CHUTOS', 'INCINERACION DE VEHICULOS CHUTOS'),
    ]
    
    tipo_incinerado = models.CharField(max_length=255, choices=TIPO_INCINERADO_CHOICES)
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
    MERCADERIA_TRANSPORTADA_CHOICES = [
        ('MERCADERIA', 'MERCADERIA VARIADA'),
        ('CARBURANTES', 'CARBURANTES'),
        ('SUSTANCIAS_CONTROLADAS', 'SUSTANCIAS CONTROLADAS'),
        ('VEHICULOS', 'VEHICULOS COMISADOS E INCINERADOS'),
    ]
    
    mercaderia_transportada = models.CharField(max_length=255, choices=MERCADERIA_TRANSPORTADA_CHOICES)
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
