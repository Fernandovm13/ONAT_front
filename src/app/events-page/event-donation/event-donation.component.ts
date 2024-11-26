import { Component, OnInit } from '@angular/core';
import { Organization } from '../../organizaciones/form-org/organization';
import { ActivatedRoute } from '@angular/router';
import { OrganizacionService } from '../../organizaciones/form-org/organization.service';
import { EventsService } from '../services/events.service';
import { EventsPage } from '../events-page';
import { PostsService } from '../services/posts.service';
import { Post } from '../post';
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
  productos:any;
  donacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizacionService,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private postService: PostsService
  ) {
    this.donacionForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      tipodonacion: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const eventId = this.activatedRoute.snapshot.paramMap.get('id')
    const postId =this.activatedRoute.snapshot.paramMap.get('id')
    if (eventId){
      this.obtenerEventoPorId(eventId);
    }else {
        console.error('ID no encontrado en la ruta');
    }

    if (postId){
      this.obtenerListaProductos(postId)
    } else {
      console.error('ID del post no encontrado')
    }
  }


  obtenerEventoPorId(id: string): void {
    this.eventsService.obtenerEventoPorId(id).subscribe(
      (data: EventsPage) => {
        console.log('Evento encontrado:', data);
        this.selectedEvent = data; // Almacena el evento encontrado
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
          
          this.productos.forEach((producto: { _id: string; }) => {
            const productoId = producto._id;
            console.log('ID del producto:', productoId);
          });
        } else {
          console.log('No se encontraron posts');
        }
      },
      (error) => {
        console.error('Error al obtener los posts', error);
      }
    );
  }

  realizarDonacion():void{

  }
  
}
