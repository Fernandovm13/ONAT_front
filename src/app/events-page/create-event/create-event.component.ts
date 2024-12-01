import { Component, OnInit } from '@angular/core';
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
export class CreateEventComponent implements OnInit{
  eventsForm: FormGroup;
  showPostComponent = false;
  isPostFormValid = false;
  datosFormularioProductos: any = null;
  productosSeleccionados: any[] = [];
  

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

  ngOnInit(): void {
      const evento = this.eventsService.getEventoEdit()
      if(evento){
        this.eventsForm.patchValue(evento)
        this.eventsService.clearEventoEdit()
      }
  }
  onProductosSeleccionados(productos: string[]) {
    this.productosSeleccionados = productos;
  }
  agregarEvento(): void {
    if (this.eventsForm.valid) {
      var dataProductos: any[] = []; // almacenar los id's y la cantidad
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = this.decodeToken(token);
        const idOrg = decodedToken.sub;

        const productsIds = this.productosSeleccionados;

        if (productsIds.length === 0) {
          alert('Debes seleccionar al menos un producto.');
          return;
        }

        dataProductos = [];
        productsIds.forEach(idProduct => {
          console.log(idProduct)
          var jsonData ={
            'idProducto': idProduct,
            'cantidad': (<HTMLInputElement>document.getElementById("cantidad-"+idProduct)).value
          }
          if((<HTMLInputElement>document.getElementById("cantidad-"+idProduct)).value == ""){
            //TODO: Mostrar modal para que el valor no sea nullo o vacio
            return;
          }
          dataProductos.push(jsonData);
        });

        const formData = {
          ...this.eventsForm.value,
          idOrg,
          dataProductos,
        };
        this.eventsService.CrearEvento(formData).subscribe(
          (eventResponse) => {
            console.log('Evento creado con éxito:', eventResponse);
            this.alertService.showAlert('event-published');
            this.eventsForm.reset();
          },
          (eventError) => {
            console.error('Error al crear el evento:', eventError);
            this.alertService.showErrorAlert();
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

  modificarEvento(){

  }
}
