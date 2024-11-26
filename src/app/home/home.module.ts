import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AbountUsSectionComponent } from './abount-us-section/abount-us-section.component';
import { HowWeWorkSectionComponent } from './how-we-work-section/how-we-work-section.component';
@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    AbountUsSectionComponent,
    HowWeWorkSectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
