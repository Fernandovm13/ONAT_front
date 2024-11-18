import { Component, OnInit } from '@angular/core';
import { Organization } from './organization';
import { OrganizacionService } from './organization.service';
import { CodigoPostalService } from './codigo-postal.service';
import { AlertService } from '../../alerts/alert.service';
import { CodigoPostal, CodigoPostalResponse } from './codigo-postal';

@Component({
  selector: 'app-form-org',
  templateUrl: './form-org.component.html',
  styleUrls: ['./form-org.component.css']
})
export class FormOrgComponent implements OnInit {

  colonias: string[] = [];

    id:number= 0;
    nombre: string = '';
    correo: string = '';
    cp:number = 0;
    estado: string = '';
    municipio: string = '';
    colonia: string = '';
    direccion: string = '';
    rfc: string = '';
    telefono: string = '';
    contrasena: string= '';
    imagen: File | null=null;

  constructor(
    private organizationService: OrganizacionService,
    private cpService: CodigoPostalService,
    private alertService: AlertService
  ) {}
    

  ngOnInit(): void {
    this.getPostalData(this.cp);
  }

  getPostalData(cp: any): void {
    const codigoPostal = Number(cp); 
    if (isNaN(codigoPostal)) {
      console.error('Código postal inválido');
      return;
    }

    this.cpService.getCP(codigoPostal).subscribe({
      next: (data: CodigoPostalResponse) => {
        console.log('Datos obtenidos:', data)

          const cpData: CodigoPostal = data.codigo_postal;
          this.estado = cpData.estado;
          this.municipio = cpData.municipio;
          this.colonias = cpData.colonias;
    },
      error: (error) => {
        console.error('Error al obtener datos del código postal:', error);
        this.colonias = [];
      }
    });
}


onSubmit(): void {
  const formData = new FormData();
  formData.append('id', this.id.toString());
  formData.append('nombre', this.nombre);
  formData.append('correo', this.correo);
  formData.append('cp', this.cp.toString());
  formData.append('estado', this.estado);
  formData.append('municipio', this.municipio);
  formData.append('colonia', this.colonia);
  formData.append('direccion', this.direccion);
  formData.append('rfc', this.rfc);
  formData.append('telefono', this.telefono);
  formData.append('contrasena', this.contrasena);

  if (this.imagen) {
    formData.append('imagen', this.imagen);
  }
  
  this.organizationService.crearOrganizacion(formData).subscribe(
    (response: Organization) => {
      console.log('Organización creada exitosamente:', response);
      this.alertService.showAlert('welcome').then(() => { 
        this.resetForm(); 
      });
    },
    (error) => {
      console.error('Error al crear la organización', error);
      alert('Hubo un error al crear la organizaion')    
    }
  );
}



  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0]
    }
  }

  resetForm(): void {
    this.id = 0;
    this.nombre = '';
    this.correo = '';
    this.cp = 0;
    this.estado = '';
    this.municipio = '';
    this.colonia = '';
    this.direccion = '';
    this.rfc = '';
    this.telefono = '';
    this.contrasena = '';
    this.imagen = null;
  }

}
