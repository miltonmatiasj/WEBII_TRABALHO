import { Component } from '@angular/core';
//import {MatDividerHarness} from '@angular/material/divider/testing';

@Component({
  selector: 'app-show-budget',
  standalone: true,
 // imports: [MatDividerHarness],
  templateUrl: './show-budget.component.html',
  styleUrl: './show-budget.component.scss'
})
export class ShowBudgetComponent {
    equipement: string = 'Test equipement';
    description: string = 'x';
    date: Date = new Date();
    telephone: string = '412114241231';
    owner: string = 'Owner name';
    tecAval: string = 'Tecnical description of the problem';
    price: number = 1.1;
}
