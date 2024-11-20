import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'onat-frontend';

  constructor(private router: Router) {}

  get showContact(): boolean {
    return  this.router.url !== '/eventshistory' && this.router.url !=='/login';
  }
}
