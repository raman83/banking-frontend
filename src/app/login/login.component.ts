import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';  // Import the LoginService
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,  // 
  imports: [CommonModule, FormsModule]  // Import CommonModule and FormsModule directly here

})
export class LoginComponent {
  username: string = '';  // Bind username
  password: string = '';  // Bind password
  errorMessage: string = '';  // Store error message for invalid login

  constructor(private router: Router, private loginService: LoginService) {}

  // Method to handle form submission
  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    // Call the login service to send the request
    this.loginService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful!', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login error:', error);
      }
    );
  }

  // Method to navigate to onboard page
  navigateToOnboard() {
    this.router.navigate(['/onboard']);
  }
}
