import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { DonationHistoryComponent } from '../donation-history/donation-history.component';
import { OrganizationalHistoryComponent } from './organizational-history/organizational-history.component';
import { OrgDashboardComponent } from './org-dashboard.component';

@NgModule({
  declarations: [
    OrgDashboardComponent,
    DonationHistoryComponent,
    OrganizationalHistoryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],

})
export class OrgDashboardModule { }
