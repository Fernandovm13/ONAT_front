import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
