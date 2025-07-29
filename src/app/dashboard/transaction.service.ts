import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {}

  // Method to get transactions for a specific account
  getTransactions(accountId: string, page: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8084/api/v1/accounts/${accountId}/transactions?page=${page}`);
  }
}
