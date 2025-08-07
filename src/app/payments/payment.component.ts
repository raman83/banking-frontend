import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';  // ✅ update path as needed


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']   // ✅ this must match the file name and path

})
export class PaymentComponent implements OnInit {
  form!: FormGroup;
  success = false;
  error = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      debtorName: ['', Validators.required],
      debtorAccount: ['', Validators.required],
      creditorName: ['', Validators.required],
      creditorAccount: ['', Validators.required],
      creditorBank: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['CAD', Validators.required],
      purpose: [''],
      requestedExecutionDate: ['', Validators.required],
      channel: ['AFT', Validators.required],
      proxyType: [''],
      proxyValue: [''],
      billerName: [''],
      billReferenceNumber: [''],
    });
  }

  submit() {
    const payload = this.form.value;

  this.paymentService.makePayment(payload).subscribe({
    next: () => {
      this.success = true;
      this.error = '';
      this.form.reset();
    },
    error: (err) => {
      this.success = false;
      this.error = '❌ Payment failed.';
      console.error(err);
    }
  });
  }
}
