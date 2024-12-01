import { Component, OnInit } from '@angular/core';
import { SdonationsService } from '../../services-interfaces/donation/sdonations.service';
import { Idonations } from '../../services-interfaces/donation/idonations';
@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.css']
})
export class DonationHistoryComponent implements OnInit {
  donaciones: Idonations[] = [];
  mensajeError: string = '';

  constructor(private donationsService: SdonationsService) {}

  ngOnInit(): void {
    this.obtenerDonaciones();
  }

  obtenerDonaciones(): void {
    this.donationsService.obtenerDonacion().subscribe({
      next: (response) => {
        this.donaciones = response;
        console.log('Datos recibidos desde el backend:', this.donaciones);
      },
      error: (error) => {
        console.error('Error al cargar donaciones:', error);
      },
    });
  }
  
 

  // Método para actualizar la tabla
  actualizarDonaciones(): void {
    this.obtenerDonaciones();
  }
}
