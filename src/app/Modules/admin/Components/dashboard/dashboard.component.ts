import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  productForm: FormGroup;
  isSubmitted = false;
  products: any[] = []; // Replace with your product model or interface
  editableProduct: any = {}; // For editing product
  editingProductId: string | null = null; // To track which product is being edited
  expandedProductId: string | null = null; // To track which product details are expanded

  constructor(private formBuilder: FormBuilder, private productService: AdminService) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      retailPrice: [null, [Validators.required, Validators.min(0)]],
      purchasePrice: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      discount: [null, [Validators.min(0), Validators.max(100)]],
      freePiece: [null, [Validators.required, Validators.min(0)]], // Changed to freePiece
      recentCheckInDate: ['', Validators.required],
      recentCheckOutDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts(); // Load existing products when the component initializes
  }

  // Getter for form controls for easier access
  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    // If the form is invalid, return
    if (this.productForm.invalid) {
      return;
    }

    // Create a product object
    const product = {
      productName: this.productForm.value.productName,
      retailPrice: +this.productForm.value.retailPrice, // Convert to number
      purchasePrice: +this.productForm.value.purchasePrice, // Convert to number
      discount: this.productForm.value.discount !== null ? +this.productForm.value.discount : undefined, // Convert to number or undefined
      quantity: +this.productForm.value.quantity, // Convert to number
      freePieces: +this.productForm.value.freePiece, // Ensure it matches backend expectation
      recentCheckInDate: this.productForm.value.recentCheckInDate,
      recentCheckOutDate: this.productForm.value.recentCheckOutDate,
    };

    // Call the service to add the product
    this.productService.createProduct(product).subscribe(
      response => {
        console.log('Product created successfully!', response);
        this.loadProducts(); // Reload the product list after creation
        this.productForm.reset(); // Reset the form
        this.isSubmitted = false; // Reset submission status
      },
      error => {
        console.error('Error creating product', error);
      }
    );
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data; // Update the product list
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  editProduct(product: any) {
    this.editingProductId = product._id; // Track the editing product ID
    this.toggleDetails(product._id);
    this.editableProduct = { ...product }; // Copy the product data to editableProduct
    this.productForm.patchValue(this.editableProduct); // Load product data into the form
  }

  saveProduct(productId: string) {
    const updatedProduct = {
      productName: this.editableProduct.productName,
      quantity: this.editableProduct.quantity,
      freePieces: this.editableProduct.freePieces,
    };

    this.productService.updateProduct(productId, updatedProduct).subscribe(
      response => {
        console.log('Product updated successfully!', response);
        this.loadProducts(); // Reload the products after saving
        this.editingProductId = null; // Reset the editing state
      },
      error => {
        console.error('Error updating product', error);
      }
    );
  }

  confirmDelete(product: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct(product._id);
    }
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      response => {
        console.log('Product deleted successfully!', response);
        this.loadProducts(); // Reload the products
      },
      error => {
        console.error('Error deleting product', error);
      }
    );
  }

  discardChanges() {
    this.editingProductId = null; // Reset the editing state
    this.editableProduct = {}; // Clear the editable product
  }

  toggleDetails(productId: string) {
    this.expandedProductId = this.expandedProductId === productId ? null : productId; // Toggle details visibility
  }

  isDetailVisible(productId: string) {
    return this.expandedProductId === productId; // Check if a product's details are visible
  }

  isEditing(productId: string) {
    return this.editingProductId === productId; // Check if a product is being edited
  }
}
