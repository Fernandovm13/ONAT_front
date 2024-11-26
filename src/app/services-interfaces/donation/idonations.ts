export enum TipoDonacion {
    unica = 'unica',
    membresia = 'membresia',
  }

export interface Idonations {
    id: number,
    nombre: string,
    apellido_p: string,
    apellido_m: string,
    correo: string,
    nacionalidad: string,
    cantidad: number,
    tipo_donacion: TipoDonacion,
    id_membresia?: number,
    id_org: number
}
