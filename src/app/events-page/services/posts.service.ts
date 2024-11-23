import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
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

   createPost(
    orgId: string[],
    productosIds: string[],
  ): Observable<Post> {
    const postData ={
      orgId,
      productosIds,
    }
    console.log('dataForm', postData)
     return this.http.post<Post>(`${this.baseUrl}/api/post/`, postData,
      {  headers: this.getAuthHeaders(),}
     ) ;
  }
}
