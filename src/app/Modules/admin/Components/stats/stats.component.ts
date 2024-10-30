import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  productStats: any[] = [];
  chartData: ChartDataset[] = [];
  chartLabels: string[] = []; // Use string array
  chartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(private productService: AdminService) {}

  ngOnInit(): void {
    this.loadProductStats();
  }

  loadProductStats() {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.productStats = this.calculateStats(data);
        this.prepareChartData();
      },
      (error) => {
        console.error('Error fetching product stats', error);
      }
    );
  }

  calculateStats(data: any[]) {
    return data.map((product) => ({
      productName: product.productName,
      totalSales: this.calculateTotalSales(product),
      quantitySold: product.piece,
      averagePrice: product.purchasePrice / product.quantity,
    }));
  }

  calculateTotalSales(product: any): number {
    return product.quantity * product.retailPrice;
  }

  prepareChartData() {
    this.chartLabels = this.productStats.map((product) => product.productName);
    this.chartData = [
      {
        data: this.productStats.map((product) => product.totalSales),
        label: 'Total Sales',
      },
      {
        data: this.productStats.map((product) => product.quantitySold),
        label: 'Quantity Sold',
      },
    ];
  }
}
