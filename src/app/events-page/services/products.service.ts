import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../products';
@Injectable({
  providedIn: 'root',
})
export class productsService {
  private baseUrl = 'http://onatapi2.integrador.xyz:3000';
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

  verCatalogo(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/api/product/`, {
      headers: this.getAuthHeaders(),
    });
  }
}
