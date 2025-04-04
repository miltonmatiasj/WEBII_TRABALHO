import { Injectable, inject, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
    private dialog = inject(MatDialog);

    openModal<T>(component: Type<T>, width: string = '400px'){
      this.dialog.open(component, {
        width,
      });
    }
}
