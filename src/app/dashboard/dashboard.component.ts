import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';  // Assuming you have a service to get account data
import { TransactionService } from './transaction.service';  // Service to get transactions
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,  // 
  imports: [CommonModule, FormsModule]  // Import CommonModule and FormsModule directly here
})
export class DashboardComponent implements OnInit {
  accounts: any[] = [];  // Array to hold accounts
  selectedAccount: any;  // Account selected by user
  currentPage: number = 1;  // Pagination for transactions
  totalTransactions: number = 0;  // Total number of transactions for pagination

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    // Get accounts from the backend
    this.accountService.getAccounts().subscribe((accounts: any[]) => {
      this.accounts = accounts;
    });
  }

  // Method to handle the selection of an account
  showAccountDetails(account: any) {
    this.selectedAccount = account;
    this.loadTransactions(1);  // Load the first page of transactions
  }

  // Method to fetch transactions for the selected account
  loadTransactions(page: number) {
    this.transactionService.getTransactions(this.selectedAccount.id, page).subscribe((data: any) => {
      this.selectedAccount.transactions = data.transactions;
      this.totalTransactions = data.totalTransactions;  // Set total transactions for pagination
      this.currentPage = page;
    });
  }

  // Navigation methods for quick actions
  navigateToTransfer() {
    // Redirect to the transfer page (not implemented here)
  }

  navigateToBillPayment() {
    // Redirect to the bill payment page (not implemented here)
  }
}
