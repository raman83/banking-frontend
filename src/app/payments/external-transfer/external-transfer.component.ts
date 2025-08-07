import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-external-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './external-transfer.component.html',
  //styleUrls: ['./external-transfer.component.scss']
})
export class ExternalTransferComponent {
  form!: FormGroup;
  success = false;
  error = '';

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
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
      proxyValue: ['']
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
        this.error = '❌ External Transfer failed.';
        console.error(err);
      }
    });
  }
}
