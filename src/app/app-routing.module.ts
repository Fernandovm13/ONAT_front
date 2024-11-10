import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardsOrgComponent } from './cards-org/cards-org.component';
import { LoginComponent } from './login/login.component';
import { FormOrgComponent } from './form-org/form-org.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsComponent } from './events/events.component'; 
import { EventDonationComponent } from './event-donation/event-donation.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipDonationComponent } from './membership-donation/membership-donation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cardsorg', component: CardsOrgComponent },
  { path: 'login', component: LoginComponent },
  {path: 'formorg', component: FormOrgComponent},
  {path: 'createevent', component:CreateEventComponent},
  {path: 'events', component: EventsComponent},
  {path: 'eventdonation', component: EventDonationComponent},
  {path: 'membership', component: MembershipComponent},
  {path: 'membershipdonation',  component: MembershipDonationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
