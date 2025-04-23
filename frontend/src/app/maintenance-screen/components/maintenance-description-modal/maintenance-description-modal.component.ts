import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-maintenance-dialog',
  standalone: true,
  templateUrl: './maintenance-description-modal.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaintenanceDescriptionModalComponent {
  descricaoManutencao = '';
  orientacoesCliente = '';

  constructor(
    public dialogRef: MatDialogRef<MaintenanceDescriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { solicitacaoId: number }
  ) {}

  salvar(): void {
    const resultado = {
      descricao: this.descricaoManutencao,
      orientacoes: this.orientacoesCliente
    };
    this.dialogRef.close(resultado);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
