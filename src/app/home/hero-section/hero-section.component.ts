import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
   @Input () contactoNumero : string = ''
   @Input () contactoCorreo : string = ''
   @Input () subtitleHero : string = ''
   @Input () titleHero : string = ''
}
