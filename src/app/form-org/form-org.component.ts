import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Organization } from './organization';

@Component({
  selector: 'app-form-org',
  templateUrl: './form-org.component.html',
  styleUrls: ['./form-org.component.css']
})
export class FormOrgComponent implements OnInit {
  orgForm: FormGroup;
  colonias: string[] = [];
  organization: Organization = {
    id: 0,
    nombre: '',
    correo: '',
    cp: 0,
    estado: '',
    municipio: '',
    colonia: '',
    direccion: '',
    rfc: '',
    telefono: '',
    contraseña: '',
    imagen: null,
    valid: undefined
  };

  private apiUrl = '/api/dipomex/v1/codigo_postal';
  private apiKey = 'ab716732e7bc9c7aab8e35ae879d397e920b1d61';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.orgForm = this.fb.group({
      nombre: ['', Validators.required],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      estado: [{ value: '', disabled: true }, Validators.required],
      municipio: [{ value: '', disabled: true }, Validators.required],
      colonia: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      rfc: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{13}$')]],
      contraseña: ['', Validators.required],
      imagen: [null, Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.orgForm.get('cp')?.valueChanges.subscribe(cp => {
      if (this.orgForm.get('cp')?.valid) {
        this.getPostalData(cp);
      }
    });
  }

  getPostalData(cp: string): void {
    const headers = new HttpHeaders().set('APIKEY', this.apiKey);
    const params = new HttpParams().set('cp', cp);

    this.http.get<any>(this.apiUrl, { headers, params }).subscribe({
      next: (data) => {
        console.log('Datos obtenidos:', data);
        if (data.estado && data.municipio && data.colonia) {
          this.organization.estado = data.estado;
          this.organization.municipio = data.municipio;
          this.colonias = data.colonia;
          this.orgForm.patchValue({
            estado: data.estado,
            municipio: data.municipio
          });
        } else {
          console.error('Datos incompletos en la respuesta de la API', data);
        }
      },
      error: (error) => {
        console.error('Error al obtener datos del código postal:', error);
        this.colonias = [];
      }
    });    
  }

  onSubmit(): void {
    if (this.orgForm.valid) {
      const formData = { ...this.orgForm.value };
      delete formData.confirmContraseña; 
      
      this.organization = {
        ...this.organization,
        ...formData
      };
      console.log('Formulario enviado:', this.organization);
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.orgForm.patchValue({ imagen: file });
      this.organization.imagen = file;
    }
  }

  passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
    const password = form.get('contraseña')?.value;
    const confirmPassword = form.get('confirmContraseña')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
