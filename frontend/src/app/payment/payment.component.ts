import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
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
  paymentConfirmed = false;

  confirmPayment() {
    this.paymentConfirmed = true;
  }

closePopup() {
  this.paymentConfirmed = false;
}
}

