import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(private router: Router) {}

  text: string = `En ONAT, transformamos cada aporte en alimentos para quienes más lo necesitan. 
      Colaboramos con organizaciones comunitarias para brindar apoyo a personas en situación
       de vulnerabilidad. Juntos, podemos hacer la diferencia y nutrir comunidades enteras.`;

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    return false;
  }
}
