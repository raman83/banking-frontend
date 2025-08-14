// src/app/payment/internal-transfer/internal-transfer.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { AccountService, Account } from '../../dashboard/account.service'; // adjust path to your AccountService

@Component({
  selector: 'app-internal-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './internal-transfer.component.html',
  //styleUrls: ['./internal-transfer.component.scss']
})
export class InternalTransferComponent implements OnInit {
  private fb = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private accountService = inject(AccountService);

  accounts: Account[] = [];
  loadingAccounts = false;
  loadError = '';

  form!: FormGroup;
  success = false;
  error = '';

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        fromAccountId: ['', Validators.required],
        toAccountId: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(0.01)]],
        currency: [{ value: 'CAD', disabled: true }],
        purpose: ['Move money'],
        requestedExecutionDate: [new Date().toISOString().slice(0, 10), Validators.required],
      },
      { validators: [this.notSameAccountValidator, this.sufficientBalanceValidator] }
    );

    this.loadAccounts('reyansh');

    this.form.get('fromAccountId')!.valueChanges.subscribe((fromId: string) => {
      const fromAcc = this.accounts.find(a => a.id === fromId);
      if (fromAcc) {
        this.form.get('currency')!.setValue(fromAcc.currency, { emitEvent: false });
      }
      if (this.form.get('toAccountId')!.value === fromId) {
        this.form.get('toAccountId')!.setValue('');
      }
      this.form.updateValueAndValidity();
    });

    this.form.get('amount')!.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity();
    });
  }

  private loadAccounts(customerId: string) {
    this.loadingAccounts = true;
    this.accountService.getAccountsByCustomer(customerId).subscribe({
      next: (list) => {
        this.loadingAccounts = false;
        this.accounts = list ?? [];
        if (this.accounts.length) {
          this.form.patchValue({
            fromAccountId: this.accounts[0].id,
            currency: this.accounts[0].currency
          });
        }
      },
      error: (err) => {
        console.error(err);
        this.loadingAccounts = false;
        this.loadError = 'Failed to load accounts.';
      }
    });
  }

  // ---- Validators ----
  private notSameAccountValidator = (group: AbstractControl): ValidationErrors | null => {
    const fromId = group.get('fromAccountId')?.value;
    const toId = group.get('toAccountId')?.value;
    if (!fromId || !toId) return null;
    return fromId === toId ? { sameAccount: true } : null;
  };

  private sufficientBalanceValidator = (group: AbstractControl): ValidationErrors | null => {
    const fromId = group.get('fromAccountId')?.value as string;
    const amount = Number(group.get('amount')?.value);
    if (!fromId || !amount || amount <= 0) return null;

    const fromAcc = this.accounts.find(a => a.id === fromId);
    if (!fromAcc) return null;

    return amount > Number(fromAcc.balance) ? { insufficientBalance: true } : null;
  };

  // ---- Helpers for template ----
  get fromAccount(): Account | undefined {
    return this.accounts.find(a => a.id === this.form.get('fromAccountId')?.value);
  }

  get toAccounts(): Account[] {
    const fromId = this.form.get('fromAccountId')?.value;
    return this.accounts.filter(a => a.id !== fromId);
  }

  get hasSameAccountError(): boolean {
    return !!this.form.errors?.['sameAccount'];
  }

  get hasInsufficientBalanceError(): boolean {
    return !!this.form.errors?.['insufficientBalance'];
  }

  // ---- Submit ----
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const payload = {
      debtorName: '',
      debtorAccount: v.fromAccountId,
      creditorName: '',
      creditorAccount: v.toAccountId,
      creditorBank: '',
      amount: v.amount,
      currency: v.currency,
      purpose: v.purpose,
      requestedExecutionDate: v.requestedExecutionDate,
      channel: 'INTERNAL'
    };

    this.paymentService.makePayment(payload).subscribe({
      next: () => {
        this.success = true;
        this.error = '';
        this.form.patchValue({ amount: 0, purpose: 'Move money' });
      },
      error: (err) => {
        console.error(err);
        this.success = false;
        this.error = 'Transfer failed.';
      }
    });
  }
}
