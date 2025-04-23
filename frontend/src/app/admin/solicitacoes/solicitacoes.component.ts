import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-solicitacoes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Solicitações de Manutenção</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="solicitacoes" class="mat-elevation-z8">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let element">{{element.id}}</td>
          </ng-container>

          <ng-container matColumnDef="cliente">
            <th mat-header-cell *matHeaderCellDef>Cliente</th>
            <td mat-cell *matCellDef="let element">{{element.cliente}}</td>
          </ng-container>

          <ng-container matColumnDef="equipamento">
            <th mat-header-cell *matHeaderCellDef>Equipamento</th>
            <td mat-cell *matCellDef="let element">{{element.equipamento}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">{{element.status}}</td>
          </ng-container>

          <ng-container matColumnDef="acoes">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button color="primary" (click)="visualizar(element)">
                <mat-icon>visibility</mat-icon>
              </button>
              <button mat-icon-button color="accent" (click)="editar(element)">
                <mat-icon>edit</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
    }

    table {
      width: 100%;
    }

    .mat-column-acoes {
      width: 120px;
      text-align: center;
    }
  `]
})
export class SolicitacoesComponent {
  displayedColumns: string[] = ['id', 'cliente', 'equipamento', 'status', 'acoes'];
  solicitacoes = [
    { id: 1, cliente: 'João Silva', equipamento: 'Notebook Dell', status: 'Em Andamento' },
    { id: 2, cliente: 'Maria Santos', equipamento: 'Desktop HP', status: 'Aguardando Peças' },
    { id: 3, cliente: 'Pedro Oliveira', equipamento: 'Impressora Epson', status: 'Concluído' }
  ];

  visualizar(solicitacao: any): void {
    console.log('Visualizar:', solicitacao);
  }

  editar(solicitacao: any): void {
    console.log('Editar:', solicitacao);
  }
} 