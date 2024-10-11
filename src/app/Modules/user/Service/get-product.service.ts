// src/app/user/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Set the Authorization header
    });

    return this.http.get<any>('/api/products', { headers }); // Make the GET request
  }
}
