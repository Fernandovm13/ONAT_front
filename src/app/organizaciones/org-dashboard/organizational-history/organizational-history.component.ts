import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../../services-interfaces/events.service';

@Component({
  selector: 'organizational-history',
  templateUrl: './organizational-history.component.html',
  styleUrl: './organizational-history.component.css',
})
export class OrganizationalHistoryComponent implements OnInit{
  eventsForm: FormGroup;
  eventData: any;
  idOrg: any;

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
  ngOnInit(): void {
    this.mostrarEventosPorOrg();
  }

  mostrarEventosPorOrg(){
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log(decodedToken)
      const orgId = decodedToken.sub;
      this.eventsService.obtenerEventoPorOrg(orgId).subscribe(
        (data) => {
          this.eventData = data;
          console.log('Datos de la org', this.eventData);
        },
        (error) => {
          console.error('Error al cargar los datos de la org: ');
        }
      );
      
    }
   
  }
 
 
  decodeToken(token: string): any {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
}
