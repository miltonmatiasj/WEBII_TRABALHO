import { Component, inject, Inject } from '@angular/core';
import { ModalService } from '../modal-service.service';
import { ConfirmationBudgetModalComponent } from '../confirmation-budget-modal/confirmation-budget-modal.component';


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

    private modalService = inject(ModalService);

    confirmationBtn(){
      this.modalService.openModal(ConfirmationBudgetModalComponent, '300px');
    }
}
