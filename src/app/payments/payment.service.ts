import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8088/api/payments';

  makePayment(payload: any): Observable<void> {
    const token = localStorage.getItem('token');  // 🔐 Get token from storage
    console.log('Saving token:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<void>(this.apiUrl, payload, { headers });
  }
}
