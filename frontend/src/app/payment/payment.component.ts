
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  serviceOrder = {
    id: 101,
    client: 'João da Silva',
    description: 'Troca de display de notebook',
    totalValue: 320.00,
    status: 'Concluído'
  };
  paymentMethod = 'PIX';
  paymentOptions = [
    { value: 'PIX', label: 'PIX' },
    { value: 'CASH', label: 'Dinheiro' },
    { value: 'CARD', label: 'Cartão' }
  ];;
  paymentConfirmed = false;

  confirmPayment() {
    this.paymentConfirmed = true;
  }

  closePopup() {
    this.paymentConfirmed = false;
  }
}

