import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizacionesComponent } from './organizaciones.component';
import { CardsOrgComponent } from './cards-org/cards-org.component';
import { FormOrgComponent } from './form-org/form-org.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrgDashboardModule } from './org-dashboard/org-dashboard.module';
import { InCardComponent } from './in-card/in-card.component';

@NgModule({

  declarations: [OrganizacionesComponent, CardsOrgComponent, FormOrgComponent, InCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    OrgDashboardModule,
    
  ],
})
export class OrganizacionesModule {}
