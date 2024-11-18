import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showSuccessAlert(): void {
    Swal.fire({
      title: 'Inicio de sesión exitoso',
      html: `<div class="emoji"><span>😊<span></div>`,
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-alert success-alert',
        confirmButton: 'alert-button success-button'
      }
    });
  }

  showErrorAlert(): void {
    Swal.fire({
      title: 'Inicio de sesión fallido',
      html: `<div class="emoji"><span>😵‍💫</span></div>`,
      confirmButtonText: 'Intente de nuevo',
      customClass: {
        popup: 'custom-alert error-alert',
        confirmButton: 'alert-button error-button'
      }
    });
  }

  showAlert(type: string): Promise<any> {
    switch (type) {
      case 'welcome':
        return Swal.fire({
          title: 'Ahora eres parte de ONAT',
          imageUrl: '/logo.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-alert blue-bg',
            confirmButton: 'alert-button'
          }
        });

      case 'event-published':
        return Swal.fire({
          title: 'Tu Evento está publicado',
          html: `<div class="emoji">😃</div>`,
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-alert',
            confirmButton: 'alert-button'
          }
        });

      case 'donation-received':
        return Swal.fire({
          title: '"Manos unidas" ha recibido tu donación',
          html: `<div class="emoji">😄</div>`,
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-alert',
            confirmButton: 'alert-button'
          }
        });

      case 'thank-you':
        return Swal.fire({
          title: '¡GRACIAS!',
          text: 'Tu donación es muy importante para todos',
          html: `<div class="emoji">😍</div>`,
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-alert',
            confirmButton: 'alert-button'
          }
        });

      case 'sponsor':
        return Swal.fire({
          title: 'Te has convertido en Padrino/Madrina',
          html: `<div class="emoji">🤩</div>`,
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-alert',
            confirmButton: 'alert-button'
          }
        });

      case 'premium':
        return Swal.fire({
          title: 'PREMIUM',
          text: 'Adquiere esta acción por tan solo $50 MXN al mes',
          imageUrl: '/logo.png',
          imageWidth: 100,
          imageHeight: 100,
          confirmButtonText: 'Adquirir',
          customClass: {
            popup: 'custom-alert blue-bg',
            confirmButton: 'alert-button warning'
          }
        });

      default:
        console.warn('Tipo de alerta no soportado:', type);
        return Promise.resolve();
    }
  }
}
