import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsPage } from '../events-page';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
    throw new Error('Token no encontrado');
  }

  CrearEvento(data: FormData): Observable<EventsPage> {
    console.log(data);
    return this.http.post<EventsPage>(
      `${this.baseUrl}/api/events/crearEvento`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  ObtenerEventos(): Observable<EventsPage[]> {
    return this.http.get<EventsPage[]>(
      `${this.baseUrl}/api/events/obtenerEventos`
    );
  }

  actualizarEventos(id: number, data: Partial<EventsPage>): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/api/events/modificarEvento/${id}`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  eliminarEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/events/eliminarEvento/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  obtenerEventoPorOrg(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/api/events/encontrarEventosPorOrg/${id}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
