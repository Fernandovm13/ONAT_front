import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { UserModule } from './users/login/user.module';
import { OrganizacionesModule } from './organizaciones/organizaciones.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsComponent } from './events/events.component';
import { EventDonationComponent } from './event-donation/event-donation.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipDonationComponent } from './membership-donation/membership-donation.component';
import { DirectDonationComponent } from './direct-donation/direct-donation.component';
import { DonationHistoryComponent } from './donation-history/donation-history.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    // AppComponent,
    // HeaderComponent,
    // ContactComponent,
    // FooterComponent,
    // HomeComponent,
    // CardsOrgComponent,
    LoginComponent,
    // FormOrgComponent
  ],
  imports: [
    BrowserModule,
    // UserModule,
    OrganizacionesModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
