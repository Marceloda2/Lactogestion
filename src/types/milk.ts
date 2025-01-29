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
    nombre: string;
    hora: string;
    proveedor_id: number;
    volumen: number;
    tanque: string;
    parametros: QualityParameters;
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