import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() modalTitle!: string;
  @Input() submitButtonCaption!: string;

  constructor(
    private _mdr: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: string
  ) {}

  closeModal() {
    this._mdr.close(false);
  }
}
