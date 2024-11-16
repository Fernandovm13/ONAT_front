import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDonationComponent } from './event-donation/event-donation.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsPageComponent } from './events-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    EventDonationComponent,
    CreateEventComponent,
    EventsPageComponent,
    CreateEventComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EventsPageModule {}
