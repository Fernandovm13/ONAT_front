// organizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from './organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizacionService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  crearOrganizacion(data: FormData): Observable<Organization> {
    return this.http.post<Organization>(`${this.baseUrl}/organizaciones/crear_org`, data);
  }

  loginOrganizacion(login: Organization): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/organizaciones/login`, login);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  obtenerOrganizaciones(): Observable<Organization> {
    return this.http.get<Organization>(
      `${this.baseUrl}/organizaciones/obtener_organizaciones`
    );
  }

  obtenerOrganizacionesPorId(id: string): Observable<Organization> {
    return this.http.get<Organization>(
      `${this.baseUrl}/organizaciones/obtenerOrgPorId/${id}`
    );
  }

  actualizarOrganizacion(
    id: number,
    data: Partial<Organization>
  ): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('authToken')}`
    );
    return this.http.put(
      `${this.baseUrl}/actualizar_organizaciones/${id}`,
      data,
      { headers }
    );
  }

  eliminarOrganizacion(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('authToken')}`
    );
    return this.http.delete(`${this.baseUrl}/eliminar_organizacion/${id}`, {
      headers,
    });
  }
}
