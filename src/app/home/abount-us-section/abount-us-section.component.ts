import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-abount-us-section',
  templateUrl: './abount-us-section.component.html',
  styleUrl: './abount-us-section.component.css'
})
export class AbountUsSectionComponent {

  @Input () paragramAbount : string = ''

}
