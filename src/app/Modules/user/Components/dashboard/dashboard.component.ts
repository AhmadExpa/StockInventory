import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { GetProductService } from '../../Service/get-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalInventory = 0;
  totalSales = 0;
  pendingRequests = 0;
  outOfStock = 0;
  products: any[] = [];

  constructor(private productService: GetProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.calculateStatistics();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  calculateStatistics(): void {
    this.totalInventory = this.products.length;
    this.totalSales = this.products.reduce((acc, product) => acc + product.retailPrice * product.quantity, 0);
    this.pendingRequests = this.products.filter(product => product.quantity < 1).length;
    this.outOfStock = this.products.filter(product => product.quantity === 0).length;
  }

  toggleDetails(product: any): void {
    product.showDetails = !product.showDetails;
  }

  downloadPDF(): void {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const headers = [['ID', 'Product', 'Price', 'Quantity', 'Check-In Date', 'Check-Out Date']];

    const data = this.products.map(product => [
      product.id,
      product.productName,
      product.retailPrice,
      product.quantity,
      product.recentCheckInDate,
      product.recentCheckOutDate,
    ]);

    pdf.setFontSize(18);
    pdf.text('Inventory Report', 20, 30);
    (pdf as any).autoTable({
      head: headers,
      body: data,
      startY: 50,
      theme: 'grid',
      headStyles: { fillColor: [0, 57, 107] },
      margin: { top: 50 },
    });

    pdf.save('inventory_report.pdf');
  }

  report(): void {
    // Any specific report generation logic can go here
    alert('Report a problem functionality is under development!');
  }
}
