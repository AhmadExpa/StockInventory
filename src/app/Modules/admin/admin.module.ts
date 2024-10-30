import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatsComponent } from './Components/stats/stats.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, StatsComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule, NgChartsModule],
})
export class AdminModule {
  constructor() {
    console.log('Admin Module Loaded');
  }
}
