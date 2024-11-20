from django.db import models

class HistoricalData(models.Model):
    category = models.CharField(max_length=100)  # Categoría de mercancía o tipo de operación
    date = models.DateField()  # Fecha del registro histórico
    region = models.CharField(max_length=100)  # Región donde ocurrió
    quantity = models.IntegerField()  # Cantidad incautada
    value = models.FloatField()  # Valor estimado en Bs.

    def __str__(self):
        return f"{self.category} - {self.date}"

class Prediction(models.Model):
    category = models.CharField(max_length=100)  # Categoría analizada
    date = models.DateField()  # Fecha de la predicción
    region = models.CharField(max_length=100)  # Región analizada
    predicted_quantity = models.IntegerField()  # Cantidad predicha
    predicted_value = models.FloatField()  # Valor predicho en Bs.

    def __str__(self):
        return f"Predicción: {self.category} - {self.date}"
