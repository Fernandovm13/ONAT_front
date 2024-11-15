import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardsOrgComponent } from './organizaciones/cards-org/cards-org.component';
import { LoginComponent } from './users/login/login.component';
import { FormOrgComponent } from './organizaciones/form-org/form-org.component';
import { CreateEventComponent } from './events-page/create-event/create-event.component';
import { EventsComponent } from './events-page/events/events.component'; 
import { EventDonationComponent } from './events-page/event-donation/event-donation.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipDonationComponent } from './membership-donation/membership-donation.component';
import { DirectDonationComponent } from './direct-donation/direct-donation.component';
import { DonationHistoryComponent } from './donation-history/donation-history.component';

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
  {path: 'historydonation', component: DonationHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
