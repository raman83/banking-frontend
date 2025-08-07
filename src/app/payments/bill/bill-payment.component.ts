import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-bill-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bill-payment.component.html',
  //styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent {
  form!: FormGroup;
  success = false;
  error = '';

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
    this.form = this.fb.group({
      debtorName: ['', Validators.required],
      debtorAccount: ['', Validators.required],
      billerName: ['', Validators.required],
      billReferenceNumber: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['CAD', Validators.required],
      purpose: [''],
      requestedExecutionDate: ['', Validators.required],
      channel: ['BILL']
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
        this.error = '❌ Bill payment failed.';
        console.error(err);
      }
    });
  }
}
