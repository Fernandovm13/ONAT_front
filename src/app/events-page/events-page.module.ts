import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDonationComponent } from './event-donation/event-donation.component';
import { EventsComponent } from './events/events.component';
import { EventsPageComponent } from './events-page.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateEventComponent } from './create-event/create-event.component';
@NgModule({
  declarations: [
    EventDonationComponent,
    EventsComponent,
    EventsPageComponent,
    CreateEventComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EventsPageModule {}
