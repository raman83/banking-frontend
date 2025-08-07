import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-internal-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './internal-transfer.component.html'
})
export class InternalTransferComponent implements OnInit {
  form!: FormGroup;
  success = false;
  error = '';

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      debtorName: ['', Validators.required],
      debtorAccount: ['', Validators.required],
      creditorName: ['', Validators.required],
      creditorAccount: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['CAD', Validators.required],
      purpose: [''],
      requestedExecutionDate: [new Date(), Validators.required],
      channel: ['INTERNAL']
    });
  }

  submit() {
    this.paymentService.makePayment(this.form.value).subscribe({
      next: () => {
        this.success = true;
        this.form.reset();
        this.error = '';
      },
      error: () => {
        this.success = false;
        this.error = 'Payment failed.';
      }
    });
  }
}
