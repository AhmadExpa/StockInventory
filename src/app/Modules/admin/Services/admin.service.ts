import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = '/api/products'; // Adjust the API endpoint if needed

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Create a new product
  createProduct(productData: {
    productName: string;
    retailPrice: number;
    purchasePrice: number;
    discount?: number;
    quantity: number;
    recentCheckInDate: string;
    recentCheckOutDate: string;
    freePieces?: number;
  }): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(productData);
    return this.http.post<any>(this.apiUrl, productData, { headers });
  }

  // Update an existing product
  updateProduct(
    productId: string,
    updatedData: {
      productName?: string;
      retailPrice?: number;
      purchasePrice?: number;
      discount?: number;
      quantity?: number;
      checkInDate?: string;
      checkOutDate?: string;
      freePieces?: number;
    }
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(`${this.apiUrl}/${productId}`, updatedData, {
      headers,
    });
  }

  // Delete a product
  deleteProduct(productId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.apiUrl}/${productId}`, { headers });
  }
}
