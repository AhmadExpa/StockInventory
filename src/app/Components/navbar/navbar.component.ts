import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/Login.Service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

    this.loginService.getAuthStatusListener().subscribe((status) => {
      this.isLoggedIn = status;


      if (this.isLoggedIn) {
        const user = this.loginService.getUserDataFromToken();

        if (user) {
          this.username = user.name;
        } else {
          this.username = '';
        }
      } else {
        this.username = '';
      }
    });
  }

  onLogout(): void {
    this.loginService.logout();
  }
}
