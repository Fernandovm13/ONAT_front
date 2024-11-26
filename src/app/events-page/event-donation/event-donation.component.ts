import { Component, OnInit } from '@angular/core';
import { Organization } from '../../organizaciones/form-org/organization';
import { ActivatedRoute } from '@angular/router';
import { OrganizacionService } from '../../organizaciones/form-org/organization.service';
import { EventsService } from '../services/events.service';
import { EventsPage } from '../events-page';
@Component({
  selector: 'app-event-donation',
  templateUrl: './event-donation.component.html',
  styleUrls: ['./event-donation.component.css'],
})
export class EventDonationComponent implements OnInit {
  orgData: Organization[] = []; 
  selectedOrg: Organization | null = null;
  selectedEvent: EventsPage | null = null;
  constructor(
    private organizationService: OrganizacionService,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    const eventId = this.activatedRoute.snapshot.paramMap.get('id')
    if (eventId){
      this.obtenerEventoPorId(eventId);
    }else {
        console.error('ID no encontrado en la ruta');
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
  
  
  


  decodeToken(token: string): any {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
}
