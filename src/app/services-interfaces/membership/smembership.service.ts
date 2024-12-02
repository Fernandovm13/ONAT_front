import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imembership } from './imembership';

@Injectable({
  providedIn: 'root'
})
export class SmembershipService {

  private baseURL = "https://onatapi.integrador.xyz/membresias";

  constructor(private http: HttpClient) { }

  getMembresias(): Observable<Imembership[]> {
    return this.http.get<Imembership[]>(`${this.baseURL}/membresias/getM`);
  }

  obtenerMembresiaById(id: number): Observable<Imembership> {
    return this.http.get<Imembership>(`${this.baseURL}/membresias/obtenerIdMembresia/${id}`);
  }
}
