from django.db import models

class HistoricalData(models.Model):
    category = models.CharField(max_length=100)  # Categoría de mercancía o tipo de operación
    date = models.DateField()  # Fecha del registro histórico
    quantity = models.IntegerField(default=0)  # Cantidad incautada (valor calculado)
    value = models.FloatField(default=0.0)  # Valor estimado en Bs. (valor calculado)

    # Opcional: Fuente del dato (tabla original)
    source = models.CharField(max_length=100, null=True, blank=True)  

    def __str__(self):
        return f"{self.category} - {self.date} (Cantidad: {self.quantity}, Valor: {self.value})"


class Prediction(models.Model):
    category = models.CharField(max_length=100)  # Categoría analizada
    date = models.DateField()  # Fecha de la predicción
    predicted_quantity = models.IntegerField(default=0)  # Cantidad predicha
    predicted_value = models.FloatField(default=0.0)  # Valor predicho en Bs.

    # Opcional: Comentarios o detalles adicionales de la predicción
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Predicción: {self.category} - {self.date} (Cantidad: {self.predicted_quantity}, Valor: {self.predicted_value})"
# comisos/models.py
from django.db import models

class AggregatedData(models.Model):
    category = models.CharField(max_length=100)  # Categoría de la incautación (Operaciones Generales, Mercadería, etc.)
    date = models.DateField()  # Fecha (semana, mes, año)
    quantity = models.IntegerField()  # Cantidad total (suma de las semanas)
    value = models.FloatField()  # Valor total (suma de los valores)

    def __str__(self):
        return f"{self.category} - {self.date} (Cantidad: {self.quantity}, Valor: {self.value})"

from django.db import models

class ComisosData(models.Model):
    category = models.CharField(max_length=100)  # Categoría de la operación
    date = models.DateField()  # Fecha del registro (puede ser de mes, semana, etc.)
    quantity = models.IntegerField(default=0)  # Cantidad total de artículos
    value = models.FloatField(default=0.0)  # Valor total de los artículos
    period = models.CharField(max_length=50)  # Semana, mes, año (período de agrupación)

    def __str__(self):
        return f"{self.category} - {self.date} (Cantidad: {self.quantity}, Valor: {self.value})"
