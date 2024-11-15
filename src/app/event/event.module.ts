import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsComponent } from './events/events.component';
import { EventDonationComponent } from './event-donation/event-donation.component';

@NgModule({
  declarations: [
    CreateEventComponent,
    EventsComponent,
    EventDonationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CreateEventComponent,
    EventsComponent,
    EventDonationComponent
  ]
})
export class EventModule { }
