import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {}

  // Method to get transactions for a specific account with pagination
  getTransactions(accountId: string, page: number, token: string, startDate?: string, endDate?: string, type?: string, category?: string): Observable<any> {
    const limit = 5; // Limit per page
    const offset = page * limit; // Calculate offset based on page number

    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    // Optional filters (date, type, category)
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (type) params = params.set('type', type);
    if (category) params = params.set('category', category);

    return this.http.get<any>(`http://localhost:8091/api/v1/accounts/${accountId}/transactions`, {
      headers: {
        'Authorization': `Bearer ${token}`  // Pass the token
      },
      params: params  // Send the parameters as query params
    });
  }
}
