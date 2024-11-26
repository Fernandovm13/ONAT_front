import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Drive } from './drive';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  private baseUrl = 'https://onatapi.integrador.xyz/drive'; 

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<Drive> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Drive>(`${this.baseUrl}/upload`, formData)
  }

  downloadFile(fileId: string | SafeUrl): Observable<any> {
    console.log("esto es lo que recibo:", fileId)

    return this.http.get(`${this.baseUrl}/download/${fileId}`, {
      responseType: 'blob'
    });
  }

}
