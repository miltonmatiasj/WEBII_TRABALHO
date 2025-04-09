import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule, MatDivider} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from "@angular/router";
import { ShowBudgetComponent } from '../show-budget-component/show-budget.component';

@Component({
  selector: 'app-test-component',
  imports: [MatButtonModule, MatDividerModule, MatDivider, MatIconModule, RouterLink, ShowBudgetComponent],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss'
})
export class TestComponentComponent {
    budgetModal = inject(MatDialog);

    openModal(): void{
      this.budgetModal.open(ShowBudgetComponent);
    }
}
