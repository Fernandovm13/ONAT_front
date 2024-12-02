import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsPage } from '../events-page';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'https://onatapi2.integrador.xyz';
  private eventoEdit: EventsPage | null = null;

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
      `${this.baseUrl}/api/events/obtenerEventos`,
      { headers: this.getAuthHeaders() }
    );
  }

  actualizarEventos(id: string, data: Partial<EventsPage>): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/api/events/modificarEvento/${id}`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  eliminarEvento(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/events/eliminarEvento/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  obtenerEventoPorOrg(id: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/api/events/encontrarEventosPorOrg/${id}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  obtenerEventoPorId(_id: string): Observable<EventsPage> {
    return this.http.get<EventsPage>(
      `${this.baseUrl}/api/events/mostrarEventosPorID/${_id}`
    );
  }

  setEventoEdit(evento: EventsPage) {
    this.eventoEdit = evento;
  }

  getEventoEdit(): EventsPage | null {
    return this.eventoEdit;
  }

  clearEventoEdit() {
    this.eventoEdit = null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
