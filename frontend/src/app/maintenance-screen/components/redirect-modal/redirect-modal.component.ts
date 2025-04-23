import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-redirect-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './redirect-modal.component.html',
  styleUrls: ['./redirect-modal.component.scss']
})
export class RedirectModalComponent {
  funcionarios: string[] = ['Mario', 'Maria'];
  funcionarioAtual: string = 'Mario'; // hardcoded funcionário logado
  funcionarioSelecionado: string | null = null;
  erro: string = '';

  constructor(public dialogRef: MatDialogRef<RedirectModalComponent>) {}

  redirecionar(): void {
    if (!this.funcionarioSelecionado) {
      this.erro = 'Selecione um funcionário.';
      return;
    }

    if (this.funcionarioSelecionado === this.funcionarioAtual) {
      this.erro = 'Não é possível redirecionar para si mesmo.';
      return;
    }

    const redirecionamento = {
      de: this.funcionarioAtual,
      para: this.funcionarioSelecionado,
      dataHora: new Date().toISOString()
    };

    this.dialogRef.close(redirecionamento);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
