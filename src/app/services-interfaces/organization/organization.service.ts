// organizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from './organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizacionService {
  private baseUrl = 'https://onatapi.integrador.xyz/organizaciones';

  constructor(private http: HttpClient) {}

  crearOrganizacion(data: FormData): Observable<Organization> {
    return this.http.post<Organization>(`${this.baseUrl}/crear_org`, data);
  }

  loginOrganizacion(login: Organization): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, login);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  obtenerOrganizaciones(): Observable<Organization[]> {
    return this.http.get<Organization[]>(
      `${this.baseUrl}/obtenerOrg`
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
      `${this.baseUrl}/editarOrg/${id}`,
      data,
      { headers }
    );
  }

  eliminarOrganizacion(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('authToken')}`
    );
    return this.http.delete(`${this.baseUrl}/eliminarOrg/${id}`, {
      headers,
    });
  }
}
