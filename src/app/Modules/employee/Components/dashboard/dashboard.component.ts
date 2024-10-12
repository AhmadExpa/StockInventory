// dashboard.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  originalProducts: { [key: string]: any } = {}; // To store original product data for discarding changes
  editingProductId: string | null = null; // To track which product is being edited
  toastMessage: string = ''; // For toast notifications

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load all products from the backend
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.map((product: any) => ({
          ...product,
          showDetails: false,
          checkoutQuantity: 0,
          checkoutPieces: 0,
        }));
      },
      (error) => {
        console.error('Error loading products', error);
        this.showToast('Failed to load products. Please try again later.');
      }
    );
  }

  // Toggle the visibility of product details
  toggleDetails(selectedProduct: any): void {
    this.products.forEach((product) => {
      if (product !== selectedProduct) {
        product.showDetails = false;
        // If another product is in edit mode, exit edit mode
        if (product.isEditing) {
          this.discardChanges(product, null);
        }
      }
    });
    selectedProduct.showDetails = !selectedProduct.showDetails;
  }

  // Check if a product is in edit mode
  isEditing(productId: string): boolean {
    return this.editingProductId === productId;
  }

  // Edit a product
  editProduct(product: any, event: Event): void {
    event.stopPropagation(); // Prevent triggering row click
    if (this.editingProductId && this.editingProductId !== product._id) {
      // If another product is being edited, discard its changes
      const currentlyEditingProduct = this.products.find(
        (p) => p._id === this.editingProductId
      );
      if (currentlyEditingProduct) {
        this.discardChanges(currentlyEditingProduct, null);
      }
    }

    if (!this.isEditing(product._id)) {
      this.editingProductId = product._id;
      product.isEditing = true;
      // Store original data in case of discard
      this.originalProducts[product._id] = { ...product };
    }
  }

  // Save changes to a product
  saveProduct(product: any, event: Event): void {
    event.stopPropagation(); // Prevent triggering row click

    // Validate inputs
    if (
      product.checkoutQuantity < 0 ||
      product.checkoutQuantity > 10 ||
      product.checkoutQuantity > product.quantity
    ) {
      this.showToast(
        'Checkout Quantity must be between 0 and 10 and cannot exceed current stock.'
      );
      return;
    }
    if (
      product.checkoutPieces < 0 ||
      product.checkoutPieces > 10 ||
      product.checkoutPieces > product.freePieces
    ) {
      this.showToast(
        'Checkout Pieces must be between 0 and 10 and cannot exceed available free pieces.'
      );
      return;
    }

    // Prepare update data (only the fields employees can update)
    const updateData: any = {
      recentCheckOutDate: this.formatDate(product.recentCheckOutDate),
    };

    if (product.checkoutQuantity > 0) {
      updateData.quantity = product.quantity - product.checkoutQuantity;
    }

    if (product.checkoutPieces > 0) {
      updateData.freePieces = product.freePieces - product.checkoutPieces;
    }

    // Call the service to update the product
    this.productService.updateProduct(product._id, updateData).subscribe(
      (response) => {
        // Update local product data
        if (product.checkoutQuantity > 0) {
          product.quantity -= product.checkoutQuantity;
          product.checkoutQuantity = 0;
        }
        if (product.checkoutPieces > 0) {
          product.freePieces -= product.checkoutPieces;
          product.checkoutPieces = 0;
        }

        // Update recentCheckOutDate with the new value
        product.recentCheckOutDate = new Date(
          product.recentCheckOutDate
        ).toISOString().split('T')[0]; // Format as YYYY-MM-DD

        product.isEditing = false;
        this.editingProductId = null;
        delete this.originalProducts[product._id];
        this.showToast('Product updated successfully.');
      },
      (error) => {
        console.error('Error updating product', error);
        this.showToast('Failed to update product. Please try again.');
      }
    );
  }

  // Discard changes made to a product
  discardChanges(product: any, event: Event | null): void {
    if (event) {
      event.stopPropagation(); // Prevent triggering row click
    }

    // Revert to original data
    if (this.originalProducts[product._id]) {
      Object.assign(product, this.originalProducts[product._id]);
      delete this.originalProducts[product._id];
    }

    // Reset editable fields
    product.checkoutQuantity = 0;
    product.checkoutPieces = 0;

    product.isEditing = false;
    this.editingProductId = null;
    this.showToast('Changes have been discarded.');
  }

  // Helper method to format date to 'YYYY-MM-DD' for date input
  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    return (
      d.getFullYear() +
      '-' +
      pad(d.getMonth() + 1) +
      '-' +
      pad(d.getDate())
    );
  }

  // Helper methods to get maximum allowed values
  getMaxQuantity(product: any): number {
    return Math.min(10, product.quantity);
  }

  getMaxPieces(product: any): number {
    return Math.min(10, product.freePieces);
  }

  // Method to show toast notifications
  showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000); // Hide after 3 seconds
  }
}
