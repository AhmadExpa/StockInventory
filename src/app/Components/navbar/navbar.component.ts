import { Component, Input } from '@angular/core';
import { LoginService } from 'src/app/Services/Login.Service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() username: string = '';
  @Input() role: string = '';
  constructor(private loginService: LoginService) { }
  onLogout(): void {
    this.loginService.logout();
  }
}
