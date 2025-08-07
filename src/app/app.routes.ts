import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { TransactionComponent } from './transaction/transaction.component';
import { OnboardComponent } from './onboard/onboard.component';
import { PaymentComponent } from './payments/payment.component';


// Exporting the routes configuration
export const appRoutes: Routes = [
  { path: '', component: LoginComponent },  // Default route for login
  { path: 'dashboard', component: DashboardComponent },  // Dashboard
  { path: 'accounts', component: AccountComponent },  // Account page
  { path: 'transactions', component: TransactionComponent },  // Transactions page
  { path: 'onboard', component: OnboardComponent }, // Add this line
  { path: 'make-payment', component: PaymentComponent }


];
