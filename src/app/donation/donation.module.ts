import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectDonationComponent } from './direct-donation/direct-donation.component';
import { DonationHistoryComponent } from './donation-history/donation-history.component';
import { MembershipDonationComponent } from './membership-donation/membership-donation.component';

@NgModule({
  declarations: [
    DirectDonationComponent,
    DonationHistoryComponent,
    MembershipDonationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DirectDonationComponent,
    DonationHistoryComponent,
    MembershipDonationComponent
  ]
})
export class DonationModule { }
