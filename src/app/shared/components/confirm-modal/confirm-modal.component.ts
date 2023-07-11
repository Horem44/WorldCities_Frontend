import { Component, Inject, Input, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class ConfirmModalComponent {
  @Input() modalTitle!: string;
  @Input() submitButtonCaption!: string;

  constructor(
    private _mdr: MatDialogRef<ConfirmModalComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: string
  ) {}

  closeModal() {
    this._dialog.closeAll();
  }
}
