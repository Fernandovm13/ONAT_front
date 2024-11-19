import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
