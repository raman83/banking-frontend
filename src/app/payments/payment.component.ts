import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { InternalTransferComponent } from './internal-transfer/internal-transfer.component';
import { ExternalTransferComponent } from './external-transfer/external-transfer.component';
import { BillPaymentComponent } from './bill/bill-payment.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    InternalTransferComponent,
    ExternalTransferComponent,
    BillPaymentComponent
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  selectedTab = 0;
}
