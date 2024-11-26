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
