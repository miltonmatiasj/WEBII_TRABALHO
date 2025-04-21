import { Component, inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-refuse-budget-modal',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './refuse-budget-modal.component.html',
  styleUrl: './refuse-budget-modal.component.scss'
})
export class RefuseBudgetModalComponent {
    modalController = inject(MatDialog);

    closeModal():void{
      alert("Serviço rejeitado com sucesso!");
      this.modalController.closeAll();
    }
}
