export interface Organization {
valid: any;
    id: number;
  nombre: string;
  correo: string;
  cp: number;
  estado: string;
  municipio: string;
  colonia: string;
  direccion: string;
  rfc: string;
  telefono: string;
  contraseña: string;
  imagen: File | null;
}
