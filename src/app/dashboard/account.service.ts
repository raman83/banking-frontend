// src/app/shared/account.service.ts  (ya jaha tumhara AccountService hai)
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Account = {
  id: string;
  nickname: string;
  maskedAccountNumber: string;
  balance: number;
  currency: string;
  accountType?: string;
  accountSubType?: string;
};

@Injectable({ providedIn: 'root' })
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8084/api/v1';

  // Dashboard wala getAccounts() agar already hai to keep it
  // getAccounts(): Observable<Account[]> { ... }

  getAccountsByCustomer(customerId: string): Observable<Account[]> {
    const token = localStorage.getItem('token'); // or 'token' if that's your key
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<Account[]>(`${this.baseUrl}/customers/${customerId}/accounts`, { headers });
  }
}
