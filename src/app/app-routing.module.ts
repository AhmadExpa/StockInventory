import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AboutComponent } from './Pages/about/about.component';
import { adminGuard } from './Guards/Admin.Guard/admin.guard';
import { employeeGuard } from './Guards/Employee.Guard/employee.guard';
import { userGuard } from './Guards/User.Guard/user.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./Modules/admin/admin.module').then((m) => m.AdminModule),
    canMatch: [adminGuard],
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./Modules/employee/employee.module').then(
        (m) => m.EmployeeModule
      ),
    canMatch: [employeeGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./Modules/user/user.module').then((m) => m.UserModule),
    canMatch: [userGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
