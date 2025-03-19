export class SolicitudAlquiler {
  numero_alquiler: number; // Número de alquiler
  id_usuario: string; // Identificación del usuario
  id_placa: string; // Placa del vehículo
  id_administrador: string; // ID del administrador que aprueba el alquiler
  fecha_inicio: string; // Formato YYYY-MM-DD
  fecha_fin: string; // Formato YYYY-MM-DD
  fecha_devolucion: string; // Opcional, solo cuando el vehículo se devuelve
  valor: number; // Precio base del alquiler
  valor_extra: number; // Costos adicionales (ej. retraso en devolución)
  estado_alquiler: string; // Estado del alquiler ("pendiente", "en curso", "finalizado")

}
