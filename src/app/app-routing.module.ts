import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardsOrgComponent } from './shared/cards-org/cards-org.component';
import { LoginComponent } from './auth/login/login.component';
import { FormOrgComponent } from './org/form-org/form-org.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { EventsComponent } from './event/events/events.component'; 
import { EventDonationComponent } from './event/event-donation/event-donation.component';
import { MembershipComponent } from './org/membership/membership.component';
import { MembershipDonationComponent } from './donation/membership-donation/membership-donation.component';
import { DirectDonationComponent } from './donation/direct-donation/direct-donation.component';
import { DonationHistoryComponent } from './donation/donation-history/donation-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cardsorg', component: CardsOrgComponent },
  { path: 'login', component: LoginComponent },
  {path: 'formorg', component: FormOrgComponent},
  {path: 'createevent', component:CreateEventComponent},
  {path: 'events', component: EventsComponent},
  {path: 'eventdonation', component: EventDonationComponent},
  {path: 'membership', component: MembershipComponent},
  {path: 'membershipdonation',  component: MembershipDonationComponent},
  {path: 'directdonation', component: DirectDonationComponent},
  {path: 'historydonation', component: DonationHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
