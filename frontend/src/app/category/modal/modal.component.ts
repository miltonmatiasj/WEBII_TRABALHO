import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ModalComponent {
  action: 'create' | 'edit' | 'delete';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string | null;
      categoryName: string;
      isActivated: boolean;
      action: 'create' | 'edit' | 'delete';
    }
  ) {
    this.action = data.action || (data.id ? 'edit' : 'create');
  }

  save(): void {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

    if (!this.data.categoryName || !nameRegex.test(this.data.categoryName.trim())) {
      alert('Insira um nome válido (Apenas letras e espaços).');
      return;
    }

    this.dialogRef.close({
      action: this.action,
      id: this.data.id,
      categoryName: this.data.categoryName,
      isActivated: this.data.isActivated ?? true,
    });
  }

  delete(): void {
    this.dialogRef.close({ action: 'delete', id: this.data.id });
  }

  close(): void {
    this.dialogRef.close();
  }
}
