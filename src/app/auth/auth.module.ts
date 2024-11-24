import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './login/user.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, UserModule],
})
export class AuthModule {}
