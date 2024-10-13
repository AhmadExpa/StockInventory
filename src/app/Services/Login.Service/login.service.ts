import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode directly
import { environmentProd } from 'src/environment/environment.prod';

interface AuthResponseData {
  token: string;
}

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly apiUrl = `${environmentProd.apiUrl}/api/auth`;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimer: any;
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient, private router: Router) {
    this.autoLogin();
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.handleAuthentication(response);
        this.redirectUserBasedOnRole();
      }),
      catchError(this.handleError)
    );
  }

  autoLogin(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = new Date().getTime() / 1000;

        if (decodedToken.exp < currentTime) {
          this.logout();
        } else {
          this.redirectUserBasedOnRole();
          const expirationDuration = (decodedToken.exp - currentTime) * 1000;
          this.autoLogout(expirationDuration);
        }
      } catch {
        this.logout();
      }
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authStatusListener.next(false);
    clearTimeout(this.tokenExpirationTimer);
    this.router.navigate(['/login']);
  }

  getUserDetails(): Observable<UserDetails> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) throw new Error('No token found');

    return this.http.post<UserDetails>(`${this.apiUrl}/user-details`, { authorization: token }).pipe(
      catchError(this.handleError)
    );
  }

  getUserDataFromToken(): UserDetails | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      const userDetails: UserDetails = {
        _id: decodedToken._id,
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
      };
      return userDetails;
    } catch {
      this.logout();
      return null;
    }
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  private handleAuthentication(response: AuthResponseData): void {
    const token = response.token;
    localStorage.setItem(this.TOKEN_KEY, token);
    this.authStatusListener.next(true);

    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDuration = (decodedToken.exp * 1000) - new Date().getTime();
      this.autoLogout(expirationDuration);
    } catch {
      this.logout();
    }
  }

  private autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private redirectUserBasedOnRole(): void {
    const userDetails = this.getUserDataFromToken();
    if (userDetails) {
      switch (userDetails.role) {
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        case 'employee':
          this.router.navigate(['/employee']);
          break;
        case 'user':
          this.router.navigate(['/user']);
          break;
        default:
          this.router.navigate(['/login']);
      }
      this.authStatusListener.next(true);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error?.message || 'An unknown error occurred!';
    return new Observable((observer) => observer.error(new Error(errorMessage)));
  }
}
