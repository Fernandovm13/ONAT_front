export interface CodigoPostal {
    centro_reparto: string;
    codigo_postal: string;
    colonias: string[];
    estado: string;
    estado_abreviatura: string;
    municipio: string;
  }

  export interface CodigoPostalResponse {
    error: boolean;
    message: string;
    codigo_postal: CodigoPostal;
  }