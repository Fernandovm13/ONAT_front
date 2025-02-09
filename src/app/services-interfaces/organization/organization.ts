import { SafeUrl } from "@angular/platform-browser";

export interface Organization {
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
  contrasena: string;
  imagen: SafeUrl | string;
}
