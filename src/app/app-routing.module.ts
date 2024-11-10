import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardsOrgComponent } from './organizaciones/cards-org/cards-org.component';
import { LoginComponent } from './users/login/login.component';
import { FormOrgComponent } from './organizaciones/form-org/form-org.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cardsorg', component: CardsOrgComponent },
  { path: 'login', component: LoginComponent },
  {path: 'formorg', component: FormOrgComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
