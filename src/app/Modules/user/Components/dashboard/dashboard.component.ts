import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importing autoTable

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  totalInventory = 100;
  totalSales = 50;
  pendingRequests = 10;
  outOfStock = 5;

  products = [
    {
      id: 1,
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      name: 'Product 1',
      price: 100,
      quantity: 10,
      checkIn: '2023-10-01',
      checkOut: '2023-10-05',
      showDetails: false,
    },
    {
      id: 2,
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      name: 'Product 2',
      price: 150,
      quantity: 5,
      checkIn: '2023-10-02',
      checkOut: '2023-10-06',
      showDetails: false,
    },
  ];

  toggleDetails(product: any) {
    product.showDetails = !product.showDetails;
  }

  downloadPDF() {
    const pdf = new jsPDF('p', 'pt', 'a4');

    // Define table headers
    const headers = [
      ['ID', 'Product', 'Price', 'Quantity', 'Check-In Date', 'Check-Out Date'],
    ];

    // Define table data (product fields)
    const data = this.products.map((product) => [
      product.id,
      product.name,
      product.price,
      product.quantity,
      product.checkIn,
      product.checkOut,
    ]);

    // Add title
    pdf.setFontSize(18);
    pdf.text('Inventory Report', 20, 30);

    // Add table using autoTable
    (pdf as any).autoTable({
      head: headers, // Set headers
      body: data, // Set product data
      startY: 50, // Start below the title
      theme: 'grid', // Table styling
      headStyles: { fillColor: [0, 57, 107] }, // Custom header style (Optional)
      margin: { top: 50 }, // Adjust margin
    });

    // Save the PDF
    pdf.save('inventory_report.pdf');
  }
  report() {
    console.log('Report Generate');
  }
}
