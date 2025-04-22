import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  serviceOrder = {
    id: 101,
    client: 'João da Silva',
    description: 'Troca de display de notebook',
    totalValue: 320.0,
    status: 'Concluído',
  };
  paymentMethod = 'PIX';
  paymentOptions = [
    { value: 'PIX', label: 'PIX' },
    { value: 'CASH', label: 'Dinheiro' },
    { value: 'CARD', label: 'Cartão' },
  ];
  paymentConfirmed = false;

  constructor(private dialogRef: MatDialogRef<PaymentComponent>) {}

  confirmPayment() {
    this.paymentConfirmed = true;
    this.dialogRef.close({ confirmed: true }); // Retorna um sinal de confirmação
  }

  closePopup() {
    this.dialogRef.close({ confirmed: false }); // Retorna um sinal de cancelamento
  }
}
