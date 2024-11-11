// organizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from './organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {
  private baseUrl = 'http://127.0.0.1:5000'; 

  constructor(private http: HttpClient) {}

  crearOrganizacion(data: FormData): Observable<Organization> {
    return this.http.post<Organization>(`${this.baseUrl}/crear_org`, data);
  }

  loginOrganizacion(login: Organization): Observable<Organization> {
    return this.http.post<Organization>(`${this.baseUrl}/login`, login);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  obtenerOrganizaciones(): Observable<Organization> {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Organization>(`${this.baseUrl}/obtener_organizaciones`, { headers });
    } else {
      throw new Error('Token no disponible');
    }
  }

  actualizarOrganizacion(id: number, data: Partial<Organization>): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put(`${this.baseUrl}/actualizar_organizaciones/${id}`, data, { headers });
  }

  eliminarOrganizacion(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.baseUrl}/eliminar_organizacion/${id}`, { headers });
  }
}
