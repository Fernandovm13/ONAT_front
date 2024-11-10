// codigo-postal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Organization } from './organization';

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {
  private apiUrl = '/api/dipomex/v1/codigo_postal';
  private apiKey = 'ab716732e7bc9c7aab8e35ae879d397e920b1d61';

  constructor(private http: HttpClient) {}

  getCP(cp: string): Observable<Partial<Organization>> {
    const headers = new HttpHeaders().set('APIKEY', this.apiKey);
    const params = new HttpParams().set('cp', cp);

    return this.http.get<Partial<Organization>>(this.apiUrl, { headers, params })
      .pipe(
        catchError((error) => {
          console.error('Error fetching postal code:', error);
          return throwError(() => new Error('Error fetching postal code'));
        })
      );
  }
}
