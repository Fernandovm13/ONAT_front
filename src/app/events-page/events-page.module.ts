import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDonationComponent } from './event-donation/event-donation.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsPageComponent } from './events-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
@NgModule({
  declarations: [
    EventDonationComponent,
    EventsPageComponent,
    CreateEventComponent,
    AddProductComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EventsPageModule {}
