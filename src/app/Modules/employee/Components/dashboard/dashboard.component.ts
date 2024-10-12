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
          checkoutQuantity: 0,
          checkoutPieces: 0,
        }));
      },
      (error) => {
        console.error('Error loading products', error);
        alert('Failed to load products. Please try again later.');
      }
    );
  }

  toggleDetails(selectedProduct: any): void {
    this.products.forEach(product => {
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

  editProduct(product: any, event: Event): void {
    event.stopPropagation(); // Prevent triggering row click
    if (!product.isEditing) {
      // Enter edit mode
      product.isEditing = true;
      // Store original data in case of discard
      this.originalProducts[product._id] = { ...product };
    }
  }

  saveProduct(product: any, event: Event): void {
    event.stopPropagation(); // Prevent triggering row click
    // Validate inputs
    if (product.checkoutQuantity < 0 || product.checkoutQuantity > 10) {
      alert('Checkout Quantity must be between 0 and 10.');
      return;
    }
    if (product.checkoutQuantity > product.quantity) {
      alert('Checkout Quantity cannot exceed current stock.');
      return;
    }
    if (product.checkoutPieces < 0 || product.checkoutPieces > 10) {
      alert('Checkout Pieces must be between 0 and 10.');
      return;
    }
    if (product.checkoutPieces > product.freePieces) {
      alert('Checkout Pieces cannot exceed available free pieces.');
      return;
    }

    // Prepare update data
    const updateData: any = {
      recentCheckOutDate: product.recentCheckOutDate,
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
        product.recentCheckOutDate = new Date(product.recentCheckOutDate);
        product.isEditing = false;
        // Optionally, refresh the product list
        // this.loadProducts();
        alert('Product updated successfully.');
      },
      (error) => {
        console.error('Error updating product', error);
        alert('Failed to update product. Please try again.');
      }
    );
  }

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
    alert('Changes have been discarded.');
  }
}
