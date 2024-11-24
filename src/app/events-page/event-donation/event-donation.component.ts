import { Component, OnInit } from '@angular/core';
import { Organization } from '../../organizaciones/form-org/organization';
import { ActivatedRoute } from '@angular/router';
import { OrganizacionService } from '../../organizaciones/form-org/organization.service';

@Component({
  selector: 'app-event-donation',
  templateUrl: './event-donation.component.html',
  styleUrls: ['./event-donation.component.css']
})
export class EventDonationComponent implements OnInit {
  orgData: Organization[] = [];  // Almacena todas las organizaciones
  selectedOrg: Organization | null = null;  // Almacena la organización seleccionada

  constructor(
    private organizationService: OrganizacionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orgId = this.activatedRoute.snapshot.paramMap.get('id');
    if (orgId) {
      this.obtenerOrganizacionesPorId(orgId);  // Llamamos al método con el id
    }
  }

  obtenerOrganizacionesPorId(id: string): void {
    this.organizationService.obtenerOrganizacionesPorId(id).subscribe(
      (data: Organization[]) => {
        this.orgData = data;  // Aquí obtienes todas las organizaciones

        // Filtrar la organización específica por el id recibido
        this.selectedOrg = this.orgData.find(org => org.id === parseInt(id)) || null;

        if (this.selectedOrg) {
          console.log('Organización encontrada:', this.selectedOrg);
        } else {
          console.error('Organización no encontrada');
        }
      },
      (error) => {
        console.error('Error al obtener la organización', error);
      }
    );
  }
}
