import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import { CardsOrgComponent } from './cards-org/cards-org.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    CardsOrgComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    CardsOrgComponent,
  ],
})
export class SharedModule {}
