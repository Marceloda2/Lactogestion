export interface QualityParameters {
  temperatura: number;
  densidad: number;
  alcohol: boolean;
  antibiotico: boolean;
  observaciones?: string;
}

export interface MilkReception {
  id: number;
  fecha: string;
  hora: string;
  productor_id: number; // Cambiado a productor_id
  volumen: number;
  tanque: string;
  parametros: QualityParameters;
  rechazada?: boolean;
}

export interface MilkDispatch {
  id: number;
  fecha: string;
  hora_salida: string;
  tanque: string;
  volumen: number;
  temperatura_salida: number;
  destino: string;
  responsable: string;
  firma: string;
  observaciones?: string;
}

export interface Provider {
  id: number;
  codigo: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  historial_calidad: {
    fecha: string;
    incidencia: string;
    accion_tomada: string;
  }[];
  entregas: MilkReception[];
}

export interface Tank {
  numero: string;
  volumen_actual: number;
  temperatura: number;
  densidad_corregida: number;
  alcohol: boolean;
  antibiotico: boolean;
  observaciones?: string;
}
export interface RejectedMilk {
  id: number;
  fecha: string;
  motivo: string;
  observaciones: string;
}