import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { TransactionService } from './transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  accounts: any[] = [];
  selectedAccount: any;
  currentPage: number = 1;
  totalTransactions: number = 0;
  totalPages: number = 0;  // To calculate total pages
  errorMessage: string = '';  // For error handling

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe((accounts: any[]) => {
      this.accounts = accounts;
    });
  }

  showAccountDetails(account: any, event: Event) {
    event.preventDefault(); // Prevent default anchor behavior
    this.selectedAccount = account;
  
    // Ensure account.id is available
    if (this.selectedAccount && this.selectedAccount.id) {
      this.loadTransactions(1);  // Load first page of transactions
    } else {
      console.error("Account ID is missing!");
    }
  }

  loadTransactions(page: number) {
    const token = localStorage.getItem('token');

    if (token) {
      this.transactionService.getTransactions(this.selectedAccount.id, page, token).subscribe((data: any) => {
        console.log("Transactions received:", data);

        if (data  && data.length > 0) {
          this.selectedAccount.transactions = data;  // Set transactions
          console.log("Transactions in selected account:", this.selectedAccount.transactions);

          // Assuming backend sends total transaction count for pagination
          this.totalTransactions = 100;  
          this.totalPages = Math.ceil(this.totalTransactions / 5);  // Assuming 5 transactions per page
          this.currentPage = page;
        } else {
          this.selectedAccount.transactions = [];  // Empty transactions if no data
        }
      }, error => {
        console.error('Error fetching transactions:', error);
        this.selectedAccount.transactions = [];  // Empty transactions on error
        this.errorMessage = 'Error fetching transactions. Please try again.';
      });
    } else {
      this.errorMessage = 'Session expired. Please login again.';
    }
  }

  navigateToTransfer() {
    // Implement logic for transfer page navigation
  }

  navigateToBillPayment() {
    // Implement logic for bill payment page navigation
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.loadTransactions(page);  // Load transactions for the selected page
    }
  }
}
