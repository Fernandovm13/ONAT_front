import { Component, Input, OnInit } from '@angular/core';
import { SmembershipService } from '../../services-interfaces/membership/smembership.service';
import { Imembership } from '../../services-interfaces/membership/imembership';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organization } from '../../services-interfaces/organization/organization';
import { OrganizacionService } from '../../services-interfaces/organization/organization.service';
import { SdonationsService } from '../../services-interfaces/donation/sdonations.service';
import { productsService } from '../../events-page/services/products.service';
import { Products } from '../../events-page/products';

@Component({
  selector: 'app-membership-donation',
  templateUrl: './membership-donation.component.html',
  styleUrl: './membership-donation.component.css',
})
export class MembershipDonationComponent implements OnInit {
  membresia: Imembership | any;
  donacionForm!: FormGroup;
  errorMessage: string = '';
  mensaje: string = '';
  @Input() memberships: any;
  organizaciones: Organization[] = [];
  productos: any[] = [];

  constructor(
    private membership: SmembershipService,
    private route: ActivatedRoute,
    private organizacion: OrganizacionService,
    private fb: FormBuilder,
    private donacionService: SdonationsService,
    private productService: productsService
  ) {}

  ngOnInit(): void {
    const idMembresia = Number(
      this.route.snapshot.queryParamMap.get('id_membresia')
    );

    if (idMembresia) {
      this.membership.obtenerMembresiaById(idMembresia).subscribe({
        next: (data: Imembership) => {
          this.membresia = data;
          const contenidos = this.membresia.contenido;
          contenidos.forEach((contenido:  { cantidad: number; idProducto: string; nombreProducto: string | null }) => {
            // Llamar al servicio con idProducto
            this.productService
              .mostrarProductos(contenido.idProducto)
              .subscribe({
                next: (producto: Products) => {
                  // console.log(producto);
                  // Asignar nombreProducto al contenido correspondiente
                  contenido.nombreProducto = producto.nombreProducto; // Ajusta según la estructura de `Products`
                },
                error: (error) => {
                  console.error(
                    `Error obteniendo producto ${contenido.idProducto}:`,
                    error
                  );
                },
              });
          });
          this.productos = this.membresia.contenido;
          
        },
        error: (error) => {
          console.error('Error al obtener la membresía:', error);
        },
      });
    } 

    this.organizacion.obtenerOrganizaciones().subscribe(
      (data: Organization[]) => {
        this.organizaciones = data;
      },
      (error) => {
        console.error('Error al obtener las organizaciones', error);
      }
    );

    this.donacionForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_p: ['', Validators.required],
      apellido_m: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nacionalidad: ['Mexicana'],
      tipo_donacion: ['membresia'],
      id_membresia: [idMembresia, Validators.required],
      id_org: ['', Validators.required],

      tarjeta: this.fb.group({
        numero_tarjeta: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{16}$')],
        ],
        cvv: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
          ],
        ],
        fecha_expiracion: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.donacionForm.valid) {
      const donationData = this.donacionForm.value;

      this.donacionService.crearDonacion(donationData).subscribe(
        (response) => {
          console.log('La donación se creo correctamente: ', response);
          alert('La donación se ha creado correctamente.');
        },
        (error) => {
          console.error('Error al crear la donación:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
      console.log(this.donacionForm);
    }
  }

  obtenerBeneficios(membership: Imembership): string[] {
    console.log(membership);
    return membership.contenido
      ? membership.contenido.map(
          (contenido) =>
            `Producto ID: ${contenido.idProducto}, Cantidad: ${contenido.cantidad}`
        )
      : [];
  }
}
