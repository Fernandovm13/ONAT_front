import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OrganizacionService } from '../../services-interfaces/organization/organization.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{ 

  loginForm!: FormGroup;

  constructor(private orgService: OrganizacionService, private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.orgService.loginOrganizacion(loginData).subscribe(
        response => {
          console.log('Login exitoso', response);
          localStorage.setItem('authToken', response.token);
          this.navigateTo('/createevent')
        },
        error => {
          console.error('Error al iniciar sesión', error);
          alert('Error al iniciar sesión. Verifique sus credenciales');
        }
      )
    }
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    return false; 
  }
}