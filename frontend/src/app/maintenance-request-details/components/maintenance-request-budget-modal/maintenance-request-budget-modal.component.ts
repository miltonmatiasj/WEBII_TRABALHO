import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConfirmationBudgetDialogComponent } from './confirmation-budget-dialog.component';
import { RefuseBudgetDialogComponent } from './refuse-budget-dialog.component';

@Component({
  selector: 'app-maintenance-request-budget-modal',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatCardModule, MatButtonModule],
  templateUrl: './maintenance-request-budget-modal.component.html',
  styleUrls: ['./maintenance-request-budget-modal.component.scss'],
})
export class maintenancerequesthistoryBudgetModalComponent {
  constructor(
    public dialogRef: MatDialogRef<maintenancerequesthistoryBudgetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  accept(): void {
    const dialogRef = this.dialog.open(ConfirmationBudgetDialogComponent, {
      width: '400px',
      data: { price: this.data.price },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close({ action: 'accept' });
      }
    });
  }

  refuse(): void {
    const dialogRef = this.dialog.open(RefuseBudgetDialogComponent, {
      width: '400px',
      data: { id: this.data.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'refuse') {
        this.dialogRef.close({ action: 'refuse', reason: result.reason });
      }
    });
  }
}
