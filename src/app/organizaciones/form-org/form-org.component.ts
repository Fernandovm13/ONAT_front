import { Component, OnInit } from '@angular/core';
import { Organization } from './organization';
import { OrganizacionService } from './organization.service';
import { CodigoPostalService } from './codigo-postal.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CodigoPostal, CodigoPostalResponse } from './codigo-postal';

@Component({
  selector:'app-form-org',
  templateUrl:'./form-org.component.html',
  styleUrls:['./form-org.component.css'],
})
export class FormOrgComponent implements OnInit {
  orgForm: FormGroup;
  cp: number = 0;
  colonias: string[] = [];
  
  colonia: string = '';
  

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizacionService,
    private cpService: CodigoPostalService
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
    // this.getPostalData(this.cp);
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
    console.log(this.orgForm.value)
    if (this.orgForm.valid) {
      console.log("valid");
      const formData = new FormData();
      Object.keys(this.orgForm.value).forEach((key) => {
        formData.append(key, this.orgForm.value[key]);
      });
      
      // if (this.imagen) {
      //   formData.append('imagen', this.imagen);

      // }
      // Imprimir los datos de formData
      this.organizationService.crearOrganizacion(formData).subscribe(
          (response: Organization) => {
            console.log('Organización creada exitosamente:', response);
            alert('La organización se ha creado correctamente.');
          },
          (error) => {
            console.log(formData)
            console.error('Error al crear la organización', error);
            alert('Hubo un error al crear la organización');
          }
        );
    
    }else{
      console.log("not valid")
    }


    
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      // this.imagen = event.target.files[0]
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
