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
  eventId: any
  orgId: any
  

  donacionForm: FormGroup;
  totalPrecio: Number = 0;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizacionService,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private postService: PostsService,
    private donationService: SdonationsService
  ) {
    this.donacionForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_p: ['', Validators.required],
      apellido_m: ['', Validators.required],
      correo: ['', Validators.required],
      nacionalidad:['Mexicana'],
      tipo_donacion: ['unica'],
      tarjeta: this.fb.group({
        numero_tarjeta: [
          '',
          // [Validators.required, Validators.pattern('^[0-9]{16}$')],
        ],
        cvv: [
          '',
          // [
          //   Validators.required,
          //   Validators.minLength(3),
          //   Validators.maxLength(3),
          // ],
        ],
        fecha_expiracion: [
          '',
          // [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')],
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

  realizarDonacion() {
    const cantidad = this.totalPrecio;
    const idEvento = this.eventId;
    const idOrg = this.orgId

    if (this.donacionForm.valid) {
      // Normalizar datos
      const formData = {
        ...this.donacionForm.value,
        cantidad,
        idEvento,
        tarjeta: {
          ...this.donacionForm.value.tarjeta,
          numero_tarjeta: this.donacionForm.value.tarjeta.numero_tarjeta.replace(/\s+/g, ''), // Eliminar espacios
        },
        id_org: idOrg
      };
  
      console.log('Datos enviados:', formData);
  
      // Llamar al servicio para crear la donación
      this.donationService.crearDonacion(formData).subscribe(
        (response) => {
          console.log('La donación se creó correctamente:', response);
          alert('La donación se ha creado correctamente.');
        },
        (error) => {
          console.error('Error al crear la donación:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
      console.log(this.donacionForm.value)
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
      console.log(product.productoId)
      const quantitySelect = <HTMLInputElement>(
        document.querySelector(`#cantidad-${product.productoId._id}`)
      );
      const cantidadSeleccionada = parseInt(quantitySelect.value, 10);
      product.productoId.selectQuantity = Math.min(cantidadSeleccionada, 3);
    });
    this.totalPrecio = this.productos.reduce((total, product) => {
      return total + product.productoId.precioBase * product.productoId.selectQuantity;
    }, 0);
    console.log('precio total', this.totalPrecio);
  }
}
