import { Component, OnInit } from '@angular/core';
import { Organization } from '../../services-interfaces/organization/organization';
import { ActivatedRoute } from '@angular/router';
import { OrganizacionService } from '../../services-interfaces/organization/organization.service';
import { EventsService } from '../services/events.service';
import { EventsPage } from '../events-page';
import { PostsService } from '../services/posts.service';
import { Post } from '../post';
import { SdonationsService } from '../../services-interfaces/donation/sdonations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import sanitizeHtml from 'sanitize-html';

@Component({
  selector: 'app-event-donation',
  templateUrl: './event-donation.component.html',
  styleUrls: ['./event-donation.component.css'],
})
export class EventDonationComponent implements OnInit {
  orgData: Organization[] = [];
  selectedOrg: Organization | null = null;
  selectedEvent: EventsPage | null = null;
  selectPost: Post | null = null;
  productos: any[] = [];
  eventId: any;
  orgId: any;

  donacionForm: FormGroup;
  totalPrecio: Number = 0;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizacionService,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private postService: PostsService,
    private donationService: SdonationsService,
    private alertService: AlertService
  ) {
    this.donacionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido_p: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      apellido_m: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      correo: ['', [Validators.required, Validators.email]],
      nacionalidad: ['Mexicana'],
      tipo_donacion: ['unica'],
      tarjeta: this.fb.group({
        numero_tarjeta: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{16}$')],
        ],
        cvv: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{3}$'),
            Validators.minLength(3),
            Validators.maxLength(3),
          ],
        ],
        fecha_expiracion: [
          '',
          [
            Validators.required,
            Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$'),
          ],
        ],
      }),
    });
  }

  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    const postId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.obtenerEventoPorId(this.eventId);
    } else {
      console.error('ID no encontrado en la ruta');
    }

    if (postId) {
      this.obtenerListaProductos(postId);
    } else {
      console.error('ID del post no encontrado');
    }
  }

  sanitizeCardNumber(cardNumber: string): string {
    // Eliminar espacios y tabulaciones
    return cardNumber.replace(/\s+/g, '').replace(/\t/g, '');
  }

  realizarDonacion() {
    if (this.donacionForm.valid) {
      let numeroTarjeta = this.donacionForm.value.tarjeta.numero_tarjeta;
      numeroTarjeta = this.sanitizeCardNumber(numeroTarjeta);  // Llamar a la función de sanitización

      // Sanitizar otros campos (por ejemplo, nombre, apellidos, correo, etc.)
      const sanitizedNombre = sanitizeHtml(this.donacionForm.value.nombre.trim());
      const sanitizedApellidoP = sanitizeHtml(this.donacionForm.value.apellido_p.trim());
      const sanitizedApellidoM = sanitizeHtml(this.donacionForm.value.apellido_m.trim());
      const sanitizedCorreo = sanitizeHtml(this.donacionForm.value.correo.trim());
      const sanitizedNacionalidad = sanitizeHtml(this.donacionForm.value.nacionalidad.trim());
      const tarjeta = {
        ...this.donacionForm.value.tarjeta,
        numero_tarjeta: numeroTarjeta,
      };
  
      // Crear el objeto con los datos del formulario
      const formData = {
        nombre: sanitizedNombre,
        apellido_p: sanitizedApellidoP,
        apellido_m: sanitizedApellidoM,
        correo: sanitizedCorreo,
        nacionalidad: sanitizedNacionalidad,
        tipo_donacion: this.donacionForm.value.tipo_donacion,
        tarjeta,
        cantidad: this.totalPrecio,
        idEvento: this.eventId,
        id_org: this.orgId,
      };
      // Mostrar los datos del formulario en consola
      console.log('Datos del formulario:', formData);
  
      // Llamar al servicio para crear la donación
      this.donationService.crearDonacion(formData).subscribe(
        (response) => {
          console.log('La donación se creó correctamente:', response);
          this.alertService.showAlert('thank-you');
        },
        (error) => {
          console.error('Error al crear la donación:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
      console.log(this.donacionForm.value);
    }
  }
  

  obtenerEventoPorId(id: string): void {
    this.eventsService.obtenerEventoPorId(id).subscribe(
      (data: EventsPage) => {
        console.log('Evento encontrado:', data);
        this.selectedEvent = data; // Almacena el evento encontrado
        this.orgId = data.idOrg;
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
      }
    );
  }

  obtenerListaProductos(id: string): void {
    this.postService.obtenerProductoPorPost(id).subscribe(
      (response: any) => {
        console.log('Posts encontrados', response);

        if (response.posts && response.posts.length > 0) {
          // Accede a los productos del primer post
          this.productos = response.posts[0].producto;
        } else {
          console.log('No se encontraron posts');
        }
      },
      (error) => {
        console.error('Error al obtener los posts', error);
      }
    );
  }

  calcularPrecioTotal(): void {
    this.productos.forEach((product) => {
      console.log(product.productoId);
      const quantitySelect = <HTMLInputElement>(
        document.querySelector(`#cantidad-${product.productoId._id}`)
      );
      const cantidadSeleccionada = parseInt(quantitySelect.value, 10);
      product.productoId.selectQuantity = Math.min(cantidadSeleccionada, 3);
    });
    this.totalPrecio = this.productos.reduce((total, product) => {
      return (
        total +
        product.productoId.precioBase * product.productoId.selectQuantity
      );
    }, 0);
    console.log('precio total', this.totalPrecio);
  }
}
