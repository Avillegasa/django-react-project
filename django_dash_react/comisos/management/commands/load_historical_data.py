import pandas as pd  # Asegúrate de importar pandas

from django.core.management.base import BaseCommand
from comisos.models import (
    Grua, Incinerado, Mercaderia, OperacionGeneral, Vehiculo
)
from comisos.analytics_models import ComisosData  # Usamos la nueva tabla

# Mapeo de meses en formato numérico
MONTH_MAPPING = {
    "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
    "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
    "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
}

class Command(BaseCommand):
    help = 'Cargar datos históricos desde las tablas comisos_*'

    def handle(self, *args, **kwargs):
        # Limpieza de la tabla ComisosData
        ComisosData.objects.all().delete()
        self.stdout.write(self.style.WARNING("Se eliminaron los datos existentes en ComisosData."))

        # Mapeo de modelos y categorías
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
                # Validar campos requeridos
                anio = getattr(record, "anio", None)
                mes = getattr(record, "mes", None)
                semanas = [getattr(record, f"semana_{i}", 0) or 0 for i in range(1, 6)]

                if not anio or not mes or not any(semanas):
                    self.stdout.write(self.style.WARNING(
                        f"Ignorando registro en {category}: {record.id} - Datos faltantes o inválidos."
                    ))
                    continue

                # Calcular la cantidad (suma de las semanas)
                cantidad = sum(semanas)
                month_number = MONTH_MAPPING.get(mes.lower(), 1)  # Usamos el valor en minúsculas del mes
                date = f"{anio}-{month_number:02d}-01"  # Formato adecuado 'YYYY-MM-01'

                # Imprimir para depuración
                print(f"Procesando: {category} - {anio} - {mes} - {date}")

                # Convertir la fecha a un tipo datetime usando pandas
                date_obj = pd.to_datetime(date)  # Convertimos la cadena de fecha en un datetime

                # Crear registro en ComisosData
                ComisosData.objects.create(
                    category=category,
                    date=date_obj,  # Fecha convertida a datetime
                    quantity=cantidad,
                    value=cantidad,  # En este caso, quantity y value son equivalentes
                )

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error procesando {category}: {e}"))
