import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.map((product: any) => ({
          ...product,
          isEditing: false,
          showDetails: false,
        }));
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  toggleDetails(product: any): void {
    product.showDetails = !product.showDetails;
  }

  editProduct(product: any): void {
    if (product.isEditing) {
      // When in editing mode, save the updates
      const updatedProduct = {
        quantity: product.quantity,
        recentCheckInDate: product.recentCheckInDate,
        recentCheckOutDate: product.recentCheckOutDate,
      };
      this.productService.updateProduct(product._id, updatedProduct).subscribe(
        (response) => {
          product.isEditing = false; // Exit editing mode on successful save
          console.log('Product updated successfully', response);
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    } else {
      product.isEditing = true; // Enter editing mode
    }
  }
}
