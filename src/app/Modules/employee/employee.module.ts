import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule {
  constructor() {
    console.log('Employee Module Loaded');
  }
}
