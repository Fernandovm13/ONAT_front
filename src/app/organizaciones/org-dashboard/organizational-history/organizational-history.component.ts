import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../../../events-page/services/events.service';
import { EventsPage } from '../../../events-page/events-page';
@Component({
  selector: 'organizational-history',
  templateUrl: './organizational-history.component.html',
  styleUrl: './organizational-history.component.css',
})
export class OrganizationalHistoryComponent implements OnInit {
  eventsForm: FormGroup;
  eventData: any;
  idOrg: any;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router
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
    this.mostrarEventosPorOrg();
  }

  mostrarEventosPorOrg() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      const orgId = decodedToken.sub;
      console.log(orgId);
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
  editarEvento(evento: EventsPage): void {
  const eventId = this.eventData._id

    this.eventsService.setEventoEdit(evento)
    this.router.navigate(['/create-event', eventId  ]);
  }

  decodeToken(token: string): any {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
}
