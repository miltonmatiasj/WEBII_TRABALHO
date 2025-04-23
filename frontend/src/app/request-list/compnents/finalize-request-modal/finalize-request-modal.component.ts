import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-finalize-request-modal',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './finalize-request-modal.component.html',
  styleUrl: './finalize-request-modal.component.scss'
})
export class FinalizeRequestModalComponent {

  constructor(
    public dialogRef: MatDialogRef<FinalizeRequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {funcionario: string}
  ){}

  confirm():void{
    this.dialogRef.close(true);
  }

  cancel(): void{
    this.dialogRef.close(false);
  }
}
