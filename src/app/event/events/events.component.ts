import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    return false; 
  }
}
