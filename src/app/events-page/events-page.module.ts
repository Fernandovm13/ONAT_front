import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDonationComponent } from './event-donation/event-donation.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsPageComponent } from './events-page.component';
import { EventsComponent } from './events/events.component';


import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CatalogProductsComponent } from './catalog-products/catalog-products.component';
@NgModule({
  declarations: [
    EventDonationComponent,
    EventsPageComponent,
    CreateEventComponent,
    AddProductComponent,
    CatalogProductsComponent,
    EventsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EventsPageModule {}
