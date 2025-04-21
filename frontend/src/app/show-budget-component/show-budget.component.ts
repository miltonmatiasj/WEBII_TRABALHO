import { Component, inject } from '@angular/core';
import { ConfirmationBudgetModalComponent } from '../confirmation-budget-modal/confirmation-budget-modal.component';
import { RefuseBudgetModalComponent } from '../refuse-budget-modal/refuse-budget-modal/refuse-budget-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-show-budget',
  standalone: true,
  imports: [MatDivider],
  templateUrl: './show-budget.component.html',
  styleUrl: './show-budget.component.scss'
})
export class ShowBudgetComponent {
    equipment: string = 'Test equipment';
    description: string = 'x';
    date: Date = new Date();
    telephone: string = '412114241231';
    owner: string = 'Owner name';
    tecAval: string = 'Tecnical description of the problem';
    price: number = 1.1;

    readonly dialog = inject(MatDialog);
    openDialog(type: string): void {
      if (type === "accept"){
        this.dialog.open(ConfirmationBudgetModalComponent);
      }else{
        this.dialog.open(RefuseBudgetModalComponent);
      }
    }
}
