import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../authentication/auth.service';

interface PaymentData {
  id: string;
  totalValue: number;
}

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
  paymentMethod = 'PIX';
  paymentOptions = [
    { value: 'PIX', label: 'PIX' },
    { value: 'CASH', label: 'Dinheiro' },
    { value: 'CARD', label: 'Cartão' },
  ];
  paymentConfirmed = false;

  constructor(
    private dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentData,
    private authService: AuthService
  ) {}

  get serviceOrder() {
    const currentUser = this.authService.currentUser();
    return {
      id: this.data.id,
      client: currentUser?.name || 'Cliente',
      description: 'Pagamento de serviço de manutenção',
      totalValue: this.data.totalValue,
      status: 'Aguardando pagamento',
    };
  }

  confirmPayment() {
    this.paymentConfirmed = true;
    this.dialogRef.close({ confirmed: true });
  }

  closePopup() {
    this.dialogRef.close({ confirmed: false });
  }
}
