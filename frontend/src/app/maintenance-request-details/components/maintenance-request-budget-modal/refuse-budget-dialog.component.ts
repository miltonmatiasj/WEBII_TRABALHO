import {Component, inject, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaintenanceRequestService } from '../../services/maintenance-request-details.service';
import {RequestService} from "../../../employee-page/services/request.service";

@Component({
  selector: 'app-refuse-budget-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  template: `
    <section>
      <div class="modal-body">
        <div class="text-body">
          <p>Por favor, nos deixe saber a razão da recusa:</p>
        </div>
        <div class="text-area">
          <mat-form-field class="text-body" appearance="fill">
            <mat-label>Digite</mat-label>
            <textarea matInput [(ngModel)]="reason"></textarea>
          </mat-form-field>
        </div>
        <div class="btn-area">
          <button mat-raised-button color="primary" (click)="submit()">
            Enviar
          </button>
          <button mat-raised-button color="warn" (click)="cancel()">
            Cancelar
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .modal-body {
        max-width: 400px;
        margin: auto;
        padding: 16px;
        text-align: center;
      }

      .text-body {
        margin-bottom: 16px;
        font-size: 16px;
      }

      .btn-area {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
      }

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class RefuseBudgetDialogComponent {
  reason: string = '';
  requestService = inject(RequestService);

  constructor(
    public dialogRef: MatDialogRef<RefuseBudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  async submit() {
    if (this.reason.trim()) {
      await this.requestService.changeStatus(
        this.data.id,
        'REJEITADA'
      );

      this.dialogRef.close({ action: 'refuse', reason: this.reason });
    } else {
      alert('Por favor, insira um motivo para a recusa.');
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
