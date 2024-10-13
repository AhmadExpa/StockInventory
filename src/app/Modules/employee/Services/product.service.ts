import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentProd } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environmentProd.apiUrl}/api/products`; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }

  updateProduct(
    productId: string,
    updateData: {
      quantity?: number;
      recentCheckOutDate: string;
      freePieces?: number;
    }
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(`${this.apiUrl}/${productId}`, updateData, {
      headers,
    });
  }
}
