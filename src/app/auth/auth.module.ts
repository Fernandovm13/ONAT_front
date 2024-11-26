import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './login/user.module';
import { AlertsModule } from '../alert/alert.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, UserModule,AlertsModule],
})
export class AuthModule {}
