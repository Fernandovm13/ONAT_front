import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Organization } from '../../services-interfaces/organization/organization';
import { OrganizacionService } from '../../services-interfaces/organization/organization.service';
import { CodigoPostalService } from '../../services-interfaces/cp/codigo-postal.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CodigoPostal, CodigoPostalResponse } from '../../services-interfaces/cp/codigo-postal';
import { DriveService } from '../../services-interfaces/drive/sdrive.service';

@Component({
  selector:'app-form-org',
  templateUrl:'./form-org.component.html',
  styleUrls:['./form-org.component.css'],
})
export class FormOrgComponent implements OnInit {
  orgForm: FormGroup;
  cp: number = 0;
  colonias: string[] = [];
  selectedFile: File | null = null; // Archivo seleccionado
  colonia: string = '';
  uploadMessage: string = '';
  fileInput: any;

  

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizacionService,
    private cpService: CodigoPostalService,
    private drive: DriveService
  ) {
    this.orgForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      colonia: ['', Validators.required],
      direccion: ['', Validators.required],
      rfc: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    console.log(this.cp);
  }


  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  getPostalData(cpostal: any): void {
    const codigoPostal = Number(cpostal);
    console.log(codigoPostal);
    if (isNaN(codigoPostal)) {
      console.error('Código postal inválido');
      return;
    }

    this.cpService.getCP(codigoPostal).subscribe({
      next: (data: CodigoPostalResponse) => {
        console.log('Datos obtenidos:', data);

        const cpData: CodigoPostal = data.codigo_postal;
        console.log(cpData.estado)
        this.colonias = cpData.colonias;
        this.orgForm.patchValue({
          estado: cpData.estado,
          municipio: cpData.municipio
        });
      },
      error: (error) => {
        console.error('Error al obtener datos del código postal:', error);
        this.colonias = [];
      },
    });
  }

  agregarOrg(): void {
    if (this.orgForm.valid) {
      const formData = new FormData();
      Object.keys(this.orgForm.value).forEach((key) => {
        formData.append(key, this.orgForm.value[key]);
      });
  
      this.organizationService.crearOrganizacion(formData).subscribe({
        next: (response: Organization) => {
          console.log('Organización creada exitosamente:', response);
          alert('La organización se ha creado correctamente.');
        },
        error: (error) => {
          console.error('Error al crear la organización', error);
          alert('Hubo un error al crear la organización');
        },
      });
    } else {
      alert('Formulario inválido, credenciales faltantes o incorrectas')
      console.log('Formulario no válido');
    }
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadMessage = ''; 
      this.uploadFile();
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.drive.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          const googleDriveUrl = response.google_drive_url; 
          console.log(googleDriveUrl)
          this.orgForm.patchValue({ imagen: googleDriveUrl });  
          this.uploadMessage = 'Archivo subido y enlace asignado correctamente.';
        },
        error: (error) => {
          this.uploadMessage = `Error al subir el archivo: ${error}`;
        },
      });
    }
  }
  
  validarCP(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const cpValue = inputElement.value;

    if (cpValue.length >= 5) {
      this.cp = Number(cpValue);
      // console.log('Código postal válido:', cpValue);
      const data = this.getPostalData(cpValue);
    }
  }


}
