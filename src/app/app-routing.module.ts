import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardsOrgComponent } from './organizaciones/cards-org/cards-org.component';
import { FormOrgComponent } from './organizaciones/form-org/form-org.component';
import { CreateEventComponent } from './events-page/create-event/create-event.component';
import { LoginComponent } from './auth/login/login.component';
import { EventsComponent } from './events-page/events/events.component';
import { MembershipDonationComponent } from './donation/membership-donation/membership-donation.component';
import { MembershipComponent } from './donation/membership/membership.component';
import { DirectDonationComponent } from './donation/direct-donation/direct-donation.component';
import { OrganizationalHistoryComponent } from './organizaciones/org-dashboard/organizational-history/organizational-history.component';
import { OrgDashboardComponent } from './organizaciones/org-dashboard/org-dashboard.component';
import { EventDonationComponent } from './events-page/event-donation/event-donation.component';
import { AuthGuard } from './auth/aut-guardian.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cardsorg', component: CardsOrgComponent },
  { path: 'login', component: LoginComponent },
  { path: 'formorg', component: FormOrgComponent },
  {
    path: 'createevent',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
  },
  { path: 'events', component: EventsComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'membershipdonation', component: MembershipDonationComponent },
  { path: 'directdonation', component: DirectDonationComponent },
  {
    path: 'orgdashboard',
    component: OrgDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'eventshistory',
    component: OrganizationalHistoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'eventdonation/:id', component: EventDonationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
