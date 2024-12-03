import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodigoPostal, CodigoPostalResponse } from './codigo-postal';

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {
  private apiUrl = 'https://onatapi.integrador.xyz/codigo_postal';
  private apiKey = 'ab716732e7bc9c7aab8e35ae879d397e920b1d61';

  constructor(private http: HttpClient) {}

  getCP(cp: number): Observable<CodigoPostalResponse> {
  const headers = new HttpHeaders().set('APIKEY', this.apiKey);
  const params = new HttpParams().set('cp', cp);

  return new Observable<CodigoPostalResponse>((observer) => {
    this.http.get<CodigoPostalResponse>(this.apiUrl, { headers, params }).subscribe({
      next: (data) => {
        observer.next(data);
      },
      error: (err) => {
        console.error('Error al obtener datos del código postal:', err);
        if (err.status === 200 && typeof err.error === 'string' && err.error.includes('<')) {
          console.error('Parece que la respuesta no está en formato JSON.');
        }
        observer.error(new Error('Error fetching postal code'));
      },
      complete: () => observer.complete(),
    });
  });
}

}
