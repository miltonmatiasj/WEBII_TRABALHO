import {Component, inject, Inject} from '@angular/core';
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
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../../environments/environment";
import {MaintenanceRequestBudget} from "../../../service-quote/services/service-quote.service";
import {MaintenanceRequest} from "../../../maintenance-request-form/mainetance-request-form.service";

@Component({
  selector: 'app-maintenance-request-budget-modal',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatCardModule, MatButtonModule],
  templateUrl: './maintenance-request-budget-modal.component.html',
  styleUrls: ['./maintenance-request-budget-modal.component.scss'],
})
export class MaintenanceRequestBudgetModalComponent {
  http = inject(HttpClient);
  price?: number;
  evaluation?: string;
  constructor(
    public dialogRef: MatDialogRef<MaintenanceRequestBudgetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaintenanceRequest,
    private dialog: MatDialog
  ) {
    lastValueFrom(this.http.get<MaintenanceRequestBudget>(`${environment.baseUrl}/maintenance-requests/${data.id}/budget`)).then((budgetInfo) => {
      this.price = budgetInfo.price;
      this.evaluation = budgetInfo.evaluation;
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  accept(): void {
    const dialogRef = this.dialog.open(ConfirmationBudgetDialogComponent, {
      width: '400px',
      data: { price: this.price },
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
