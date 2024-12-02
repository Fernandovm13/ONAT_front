import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { EventsPage } from '../events-page';
import { PostsService } from '../services/posts.service';
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
    private postsService: PostsService
  ) {
    this.eventsForm = this.fb.group({
      nombreEvento: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFinal: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: ['', Validators.required],
      idOrg: [''],
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
  
        // Actualizamos el formulario con idOrg antes de enviar los datos
        this.eventsForm.patchValue({
          idOrg: idOrg
        });
  
        // Ahora enviamos los datos del formulario con el idOrg incluido
        this.postsService.createPost(idOrg, productsIds).subscribe(
          (postResponse) => {
            console.log('Post creado con éxito:', postResponse);
  
            this.eventsService.CrearEvento(this.eventsForm.value).subscribe(
              (eventResponse) => {
                console.log('Evento creado con éxito:', eventResponse);
                alert('El evento y los productos se han creado correctamente.');
                this.eventsForm.reset();
              },
              (eventError) => {
                console.error('Error al crear el evento:', eventError);
                alert('Hubo un error al guardar el evento.');
              }
            );
          },
          (postError) => {
            console.error('Error al guardar el post:', postError);
            alert('Hubo un error al guardar los productos del evento.');
          }
        );
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
  logout() {
    const confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      window.location.href = "/login"; 
    }
  }
  
}
