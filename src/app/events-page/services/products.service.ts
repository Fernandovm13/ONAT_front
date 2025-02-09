import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../products';
@Injectable({
  providedIn: 'root',
})
export class productsService {
  private baseUrl = 'https://onatapi2.integrador.xyz';
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log(token);
    
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
    throw new Error('Token no encontrado');
  }

  verCatalogo(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/api/product/`,
      { headers: this.getAuthHeaders() }
    );
  }

  mostrarProductos(_id:string): Observable<Products>{
    return this.http.get<Products>(`${this.baseUrl}/api/product/${_id}`)
  }
}
