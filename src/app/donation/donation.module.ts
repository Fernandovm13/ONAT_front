import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectDonationComponent } from './direct-donation/direct-donation.component';
import { MembershipDonationComponent } from './membership-donation/membership-donation.component';
import { MembershipComponent } from './membership/membership.component';
@NgModule({
  declarations: [DirectDonationComponent, MembershipDonationComponent, MembershipComponent],
  imports: [CommonModule],
})
export class DonationModule {}
