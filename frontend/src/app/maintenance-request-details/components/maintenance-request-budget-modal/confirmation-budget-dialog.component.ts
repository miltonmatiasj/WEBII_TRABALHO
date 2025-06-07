import {Component, inject, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestService } from '../../services/maintenance-request-details.service';
import {RequestService} from "../../../employee-page/services/request.service";

@Component({
  selector: 'app-confirmation-budget-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <section>
      <mat-card class="modal-confirmation">
        <mat-card-content>
          <p class="text-body">
            Aceitar orçamento no valor de
            <strong>R$ {{ data.price | number : '1.2-2' }}</strong
            >?
          </p>
        </mat-card-content>
        <mat-card-actions align="end" class="ok-btn-area">
          <button mat-raised-button color="primary" (click)="confirm()">
            Confirmar
          </button>
          <button mat-raised-button color="warn" (click)="cancel()">
            Cancelar
          </button>
        </mat-card-actions>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .modal-confirmation {
        max-width: 400px;
        margin: auto;
        padding: 16px;
        text-align: center;
      }

      .text-body {
        margin-bottom: 16px;
        font-size: 16px;
      }

      .ok-btn-area {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    `,
  ],
})
export class ConfirmationBudgetDialogComponent {
  requestService = inject(RequestService);
  constructor(
    public dialogRef: MatDialogRef<ConfirmationBudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string; price: number },
  ) {}

  async confirm() {
    await this.requestService.changeStatus(
      this.data.id,
      'APROVADA'
    );

    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
