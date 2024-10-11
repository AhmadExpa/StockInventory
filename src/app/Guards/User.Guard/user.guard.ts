import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/Login.Service/login.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Function-based guard for admin routes
export const userGuard: CanMatchFn = (route, segments) => {
  const loginService = inject(LoginService); // Initialize LoginService
  const router = inject(Router); // Inject Router

  const token = localStorage.getItem('authToken'); // Check for token in localStorage

  if (!token) {
    // If no token is found, redirect to login with a message
    router.navigate(['login'], {
      queryParams: { message: 'You need to log in first.' },
    });
    return false; // Block access if not logged in
  }

  // Asynchronously get the user details and check the role
  return loginService.getUserDetails().pipe(
    map((userDetails) => {
      if (userDetails.role === 'user') {
        return true; // Allow access if the role is 'admin'
      } else {
        // Redirect and log out if the role is not 'admin'
        localStorage.removeItem('authToken'); // Clear token
        router.navigate(['login'], { queryParams: { message: 'Access blocked. You have been logged out.' } });
        return false; // Block access if the user is not an admin
      }
    }),
    catchError(() => {
      // In case of an error (e.g., failed to fetch user details), redirect to login
      localStorage.removeItem('authToken'); // Clear token
      router.navigate(['login'], { queryParams: { message: 'Session expired. Please log in again.' } });
      return of(false); // Block access on error
    })
  );
};
