import { Component, OnInit } from '@angular/core';
import { SmembershipService } from '../../services-interfaces/membership/smembership.service';
import { Imembership } from '../../services-interfaces/membership/imembership';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent implements OnInit {

  memberships: Imembership[] = [];

  constructor (private membershipService: SmembershipService) {}

  ngOnInit(): void {
    this.mostrarMembresias()
  }

  mostrarMembresias(): void {
    this.membershipService.getMembresias().subscribe({
      next: (data: Imembership[]) => {
        this.memberships = data;
        console.log('Membresias: ', this.memberships);
      },
      error: (error) => {
        console.error('No se pudieron mostrar las memmbresias: ', error);
      }
    })
  }
  obtenerBeneficios(membership: Imembership): string[] {
    return membership.contenido ? Object.values(membership.contenido) : [];
  }
  
}
