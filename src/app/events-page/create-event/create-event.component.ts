import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { EventsPage } from '../events-page';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  eventsForm: FormGroup;

  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.eventsForm = this.fb.group({
      nombreEvento: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFinal: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  agregarEvento() {
    if (this.eventsForm.valid) {
      this.eventsService.CrearEvento(this.eventsForm.value).subscribe(
        (response: EventsPage) => {
          console.log('evento agregado con éxito', response);
          alert('evento se ha creado correctamente.');
        },
        (error) => {
          console.log(this.eventsForm.value);
          console.error('Error al agregar la evento', error);
          alert('Hubo un error al crear el evento');
        }
      );
    } else {
      console.error('Formulario inválido');
      console.log(this.eventsForm.controls); // Muestra el estado de cada campo
    }
  }
  decodeToken(token: string): any {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
}
