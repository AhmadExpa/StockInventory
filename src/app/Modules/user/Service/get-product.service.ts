// src/app/user/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentProd } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  constructor(private http: HttpClient) { }
  private apiUrl = `${environmentProd.apiUrl}/api/products`
  getProducts(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Set the Authorization header
    });

    return this.http.get<any>(this.apiUrl, { headers }); // Make the GET request
  }
}
