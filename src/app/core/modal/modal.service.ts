import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly _dialogConfig: MatDialogConfig = {
    disableClose: true,
  };

  constructor(private readonly _dialog: MatDialog) {}

  open<T>(component: Type<T>): MatDialogRef<T> {
    return this._dialog.open<T>(component, this._dialogConfig);
  }

  closeAll() {
    this._dialog.closeAll();
  }
}
