import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CardsOrgComponent } from './cards-org/cards-org.component';
import { LoginComponent } from './login/login.component';
import { FormOrgComponent } from './form-org/form-org.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsComponent } from './events/events.component';
import { EventDonationComponent } from './event-donation/event-donation.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipDonationComponent } from './membership-donation/membership-donation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    CardsOrgComponent,
    LoginComponent,
    FormOrgComponent,
    CreateEventComponent,
    EventsComponent,
    EventDonationComponent,
    MembershipComponent,
    MembershipDonationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
