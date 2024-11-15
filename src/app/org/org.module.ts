import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormOrgComponent } from './form-org/form-org.component';
import { MembershipComponent } from './membership/membership.component';

@NgModule({
  declarations: [
    FormOrgComponent,
    MembershipComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormOrgComponent,
    MembershipComponent
  ]
})
export class OrgModule { }
