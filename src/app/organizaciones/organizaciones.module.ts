import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizacionesComponent } from './organizaciones.component';
import { CardsOrgComponent } from './cards-org/cards-org.component';
import { FormOrgComponent } from './form-org/form-org.component';
@NgModule({
  declarations: [OrganizacionesComponent, CardsOrgComponent, FormOrgComponent],
  imports: [CommonModule],
})
export class OrganizacionesModule {}
