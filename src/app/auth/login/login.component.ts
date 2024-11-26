import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizacionService } from '../../services-interfaces/organization/organization.service';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private orgService: OrganizacionService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.orgService.loginOrganizacion(loginData).subscribe(
        (response) => {
          localStorage.setItem('authToken', response.token);
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
        this.alertService.showErrorAlert()
        }
      );
    }
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    return false; 
  }
}
