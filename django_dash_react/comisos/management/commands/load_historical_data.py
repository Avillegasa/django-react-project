from django.core.management.base import BaseCommand
from comisos.models import (
    Grua, Incinerado, Mercaderia, OperacionGeneral, Vehiculo
)
from comisos.analytics_models import HistoricalData

# Mapeo de meses en formato numérico
MONTH_MAPPING = {
    "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04",
    "Mayo": "05", "Junio": "06", "Julio": "07", "Agosto": "08",
    "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12"
}

class Command(BaseCommand):
    help = 'Cargar datos históricos desde las tablas específicas'

    def handle(self, *args, **kwargs):
        # Limpieza previa de la tabla HistoricalData (opcional)
        HistoricalData.objects.all().delete()

        # Procesar comisos_operaciongeneral
        for record in OperacionGeneral.objects.all():
            month_number = MONTH_MAPPING.get(record.mes, "01")
            HistoricalData.objects.create(
                category="Operaciones Generales",
                date=f"{record.anio}-{month_number}-01",
                region=getattr(record, 'region', "Sin definir"),
                quantity=record.cantidad,
                value=record.semana_1 + record.semana_2 + record.semana_3 + record.semana_4 + record.semana_5
            )

        # Procesar comisos_mercaderia
        for record in Mercaderia.objects.all():
            month_number = MONTH_MAPPING.get(record.mes, "01")
            HistoricalData.objects.create(
                category="Mercadería",
                date=f"{record.anio}-{month_number}-01",
                region=getattr(record, 'region', "Sin definir"),
                quantity=record.cantidad,
                value=record.semana_1 + record.semana_2 + record.semana_3 + record.semana_4 + record.semana_5
            )

        # Procesar comisos_vehiculo
        for record in Vehiculo.objects.all():
            month_number = MONTH_MAPPING.get(record.mes, "01")
            HistoricalData.objects.create(
                category="Vehículos",
                date=f"{record.anio}-{month_number}-01",
                region=getattr(record, 'region', "Sin definir"),
                quantity=record.cantidad,
                value=record.semana_1 + record.semana_2 + record.semana_3 + record.semana_4 + record.semana_5
            )

        # Procesar comisos_incinerado
        for record in Incinerado.objects.all():
            month_number = MONTH_MAPPING.get(record.mes, "01")
            HistoricalData.objects.create(
                category="Incinerados",
                date=f"{record.anio}-{month_number}-01",
                region=getattr(record, 'region', "Sin definir"),
                quantity=record.cantidad,
                value=record.semana_1 + record.semana_2 + record.semana_3 + record.semana_4 + record.semana_5
            )

        # Procesar comisos_grua
        for record in Grua.objects.all():
            month_number = MONTH_MAPPING.get(record.mes, "01")
            HistoricalData.objects.create(
                category="Grúas",
                date=f"{record.anio}-{month_number}-01",
                region=getattr(record, 'region', "Sin definir"),
                quantity=record.cantidad,
                value=record.semana_1 + record.semana_2 + record.semana_3 + record.semana_4 + record.semana_5
            )

        self.stdout.write(self.style.SUCCESS('Datos históricos cargados exitosamente desde las tablas especificadas.'))
