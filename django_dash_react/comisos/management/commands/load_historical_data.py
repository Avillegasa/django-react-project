from django.core.management.base import BaseCommand
from comisos.models import (
    Grua, Incinerado, Mercaderia, OperacionGeneral, Vehiculo
)
from comisos.analytics_models import HistoricalData

# Mapeo de meses a números
MONTH_MAPPING = {
    "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04",
    "Mayo": "05", "Junio": "06", "Julio": "07", "Agosto": "08",
    "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12"
}

class Command(BaseCommand):
    help = 'Cargar datos históricos desde las tablas comisos_*'

    def handle(self, *args, **kwargs):
        # Limpieza de la tabla HistoricalData
        HistoricalData.objects.all().delete()
        self.stdout.write(self.style.WARNING("Se eliminaron los datos existentes en HistoricalData."))

        # Mapeo de categorías a modelos
        models_mapping = {
            "Operaciones Generales": OperacionGeneral,
            "Mercadería": Mercaderia,
            "Vehículos": Vehiculo,
            "Incinerados": Incinerado,
            "Grúas": Grua,
        }

        for category, model in models_mapping.items():
            self.process_model(model, category)

        self.stdout.write(self.style.SUCCESS("Datos históricos cargados exitosamente."))

    def process_model(self, model, category):
        records = model.objects.all()
        for record in records:
            try:
                anio = record.anio
                mes = record.mes
                cantidad = record.cantidad
                semanas = [
                    getattr(record, f'semana_{i}', 0) or 0 for i in range(1, 6)
                ]

                # Validar campos obligatorios
                if not anio or not mes:
                    self.stdout.write(self.style.WARNING(
                        f"Ignorando registro en {category}: {record.id} - Datos faltantes: "
                        f"anio={anio}, mes={mes}"
                    ))
                    continue

                # Convertir mes a formato numérico
                month_number = MONTH_MAPPING.get(mes.capitalize(), None)
                if not month_number:
                    self.stdout.write(self.style.WARNING(
                        f"Ignorando registro en {category}: {record.id} - Mes inválido: {mes}"
                    ))
                    continue

                # Generar fecha
                date = f"{anio}-{month_number}-01"

                # Calcular cantidad si no existe
                if not cantidad or cantidad == 0:
                    cantidad = sum(semanas)

                # Calcular valor total
                value = sum(semanas)

                # Crear registro en HistoricalData
                HistoricalData.objects.create(
                    category=category,
                    date=date,
                    quantity=cantidad,
                    value=value,
                    source=model._meta.db_table  # Nombre de la tabla fuente
                )
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error procesando {category}: {e}"))