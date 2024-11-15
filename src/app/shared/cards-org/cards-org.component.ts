import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-org',
  templateUrl: './cards-org.component.html',
  styleUrls: ['./cards-org.component.css']
})
export class CardsOrgComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    return false; 
  }
}
