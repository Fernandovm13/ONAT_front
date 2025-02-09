import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdonationsService {

  private baseURL = "https://onatapi.integrador.xyz/donaciones";

  constructor(private http: HttpClient) { }

  crearDonacion(data:any): Observable<any> {
    return this.http.post(`${this.baseURL}/realizarDonacion`, data);
  }

  obtenerDonacion(): Observable<any> {
    return this.http.get(`${this.baseURL}/obtenerDon`);
  }

  obtenerDonacionByOrganizacion(orgId:number): Observable<any> {
    return this.http.get(`${this.baseURL}/org/${orgId}`);
  }

}
