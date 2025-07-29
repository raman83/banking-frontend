import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8084/api/v1/customers/reyansh/accounts';  // API for accounts

  constructor(private http: HttpClient) {}

  // Method to get accounts with Authorization header
  getAccounts(): Observable<any[]> {
    // Get the token from localStorage (or wherever it is stored)
    const token = localStorage.getItem('token'); 

    // Set the headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the API request with the Authorization header
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
