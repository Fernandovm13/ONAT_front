import { Component, OnInit } from '@angular/core';
import { Idonations } from '../../services-interfaces/donation/idonations';
import { Icard } from '../../services-interfaces/card/icard';
import { SdonationsService } from '../../services-interfaces/donation/sdonations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { response } from 'express';
import { OrganizacionService } from '../../services-interfaces/organization/organization.service';
import { Organization } from '../../services-interfaces/organization/organization';
@Component({
  selector: 'app-direct-donation',
  templateUrl: './direct-donation.component.html',
  styleUrl: './direct-donation.component.css'
})
export class DirectDonationComponent implements OnInit{
  donacionForm!: FormGroup;
  errorMessage: string = '';
  mensaje: string = '';
  organizaciones: Organization[] = [];
  

  constructor(
    private donacionService: SdonationsService,
    private fb: FormBuilder,
    private organizacion: OrganizacionService
  ) {}

  ngOnInit(): void {
      this.organizacion.obtenerOrganizaciones().subscribe(
        (data: Organization[]) => {
          
          this.organizaciones = data;
        }, 
        (error) => {
          console.error('Error al obtener las organizaciones: ', error)
        }
      ); 
    this.donacionForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_p: ['', Validators.required],
      apellido_m: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nacionalidad: ['Mexicana'],
      cantidad: ['', Validators.required],
      tipo_donacion: ['unica'],
      id_org: ['', Validators.required],

      tarjeta: this.fb.group({
        numero_tarjeta: ['',[ Validators.required, Validators.pattern('^[0-9]{16}$')]],
        cvv: ['',[ Validators.required, Validators.minLength(3),Validators.maxLength(3)]],
        fecha_expiracion: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.donacionForm.valid) {
      const donationData = this.donacionForm.value;

      
      this.donacionService.crearDonacion(donationData).subscribe(
        (response) => {
          console.log('La donación se creo correctamente: ', response)
          alert('La donación se ha creado correctamente.');
        },
        (error) => {
          console.error('Error al crear la donación:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
      console.log(this.donacionForm)
    }
  }
}
