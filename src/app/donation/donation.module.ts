import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectDonationComponent } from './direct-donation/direct-donation.component';
import { MembershipDonationComponent } from './membership-donation/membership-donation.component';
import { MembershipComponent } from './membership/membership.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DirectDonationComponent, MembershipDonationComponent, MembershipComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DonationModule {}
