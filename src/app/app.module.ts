import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { DonationModule } from './donation/donation.module';
import { SharedModule } from './components/SharedModule.module';
import { EventsPageModule } from './events-page/events-page.module';
import { OrganizacionesModule } from './organizaciones/organizaciones.module';
import { HomeModule } from './home/home.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    OrganizacionesModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    DonationModule,
    EventsPageModule,
    HomeModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
