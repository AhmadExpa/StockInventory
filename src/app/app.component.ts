import { Component, HostListener, OnInit } from '@angular/core';
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
  username: string = ''; // get username from token 
  role: string = ''; // get userrole from token 
  screenWidth: number = window.innerWidth; // Get initial screen width

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // Subscribe to login status updates
    this.loginService.getAuthStatusListener().subscribe((status) => {
      this.isLoggedIn = status;


      if (this.isLoggedIn) {
        const user = this.loginService.getUserDataFromToken();

        if (user) {
          this.username = user.name;
          this.role = user.role;
        } else {
          this.username = '';
        }
      }
    });
  }

  // Handle sidebar state changes
  handleSidebarState(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth; // Update the screen width on window resize
  }

  // Method to check if the screen is mobile-sized
  isMobileScreen(): boolean {
    return this.screenWidth < 992; // Return true for mobile screens (below lg breakpoint)
  }
}
