import { Component, OnInit } from '@angular/core';
import { LoginService } from './Services/Login.Service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'StockInventory'; // Application title
  isCollapsed: boolean = true; // Sidebar state
  isLoggedIn: boolean = false; // User login status

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // Subscribe to login status updates
    this.loginService.getAuthStatusListener().subscribe((status) => {
      this.isLoggedIn = status; // Update the login status
      console.log("Login status:", this.isLoggedIn);
    });
  }

  // Handle sidebar state changes
  handleSidebarState(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }
}
