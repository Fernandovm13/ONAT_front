import { Component,OnInit } from '@angular/core';
import { OrganizacionService } from '../../services-interfaces/organization/organization.service';
import { Organization } from '../../services-interfaces/organization/organization';
import { DriveService } from '../../services-interfaces/drive/sdrive.service';
import { Drive } from '../../services-interfaces/drive/drive';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-in-card',
  templateUrl: './in-card.component.html',
  styleUrl: './in-card.component.css'
})
export class InCardComponent implements OnInit {
  organizations: Organization[] = [];
  imagen: string | SafeUrl = '';

  constructor(
    private organization: OrganizacionService,
    private drive: DriveService,
    private domSanitazer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations(): void {
    this.organization.obtenerOrganizaciones().subscribe({
      next: (data) => {
        this.organizations = data;
        console.log('Organizaciones recibidas:', data);
        this.showImg()
      },
      error: (err) => {
        console.error('Error loading organizations', err);
      }
    });
  }

  showImg(): void {
    this.organizations.forEach((organization, index) => {
      this.drive.downloadFile(organization.imagen).subscribe({
        next: (response) => {
          console.log(response)
          const img = URL.createObjectURL(response);
          this.organizations[index].imagen = this.domSanitazer.bypassSecurityTrustUrl(img);
        },
        error: (err) => {
          console.error('Error al descargar la imagen: ', err);
        }
      })
    });
  }
  
}