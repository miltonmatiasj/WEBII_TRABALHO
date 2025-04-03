import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
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
    MatButtonModule
  ]
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | null; name: string }
  ) {}

  close(): void
  {
    this.dialogRef.close();
  }

  save(): void {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  
    if (!this.data.name || !nameRegex.test(this.data.name.trim())) {
      alert("Please enter a valid name (only letters and spaces).");
      return;
    }
  
    this.dialogRef.close(this.data);
  }
  
}
