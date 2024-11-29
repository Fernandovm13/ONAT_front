import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { PostsService } from '../services/posts.service';
import { EventsPage } from '../events-page';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  eventsForm: FormGroup;
  showPostComponent = false;
  isPostFormValid = false;
  datosFormularioProductos: any = null;
  productosSeleccionados: string[] = [];

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private postsService: PostsService,
    private alertService: AlertService
  ) {
    this.eventsForm = this.fb.group({
      nombreEvento: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFinal: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  onProductosSeleccionados(productos: string[]) {
    this.productosSeleccionados = productos;
    console.log('Productos seleccionados:', this.productosSeleccionados);
  }
  agregarEvento(): void {
    if (this.eventsForm.valid) {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = this.decodeToken(token);
        const idOrg = decodedToken.sub;
  
        const productsIds = this.productosSeleccionados;
  
        if (productsIds.length === 0) {
          alert('Debes seleccionar al menos un producto.');
          return;
        }
  
        const formData = { 
          ...this.eventsForm.value,
          idOrg,
          productsIds
        };
        this.eventsService.CrearEvento(formData).subscribe(
          (eventResponse) => {
            console.log('Evento creado con éxito:', eventResponse);
          this.alertService.showAlert('event-published')
            this.eventsForm.reset();
          },
          (eventError) => {
            console.error('Error al crear el evento:', eventError);
            this.alertService.showErrorAlert()
          }
        );
        // Ahora enviamos los datos del formulario con el idOrg incluido
        
      } else {
        alert('No se encontró el token de autenticación.');
      }
    } else {
      console.error('Formulario inválido');
      console.log(this.eventsForm.controls);
    }
  }
  

  decodeToken(token: string): any {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }

  togglePostComponent() {
    this.showPostComponent = !this.showPostComponent;
  }
}
