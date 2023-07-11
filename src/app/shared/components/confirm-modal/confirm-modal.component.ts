import { Component, Input, } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/modal/modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() modalTitle!: string;
  @Input() submitButtonCaption!: string;
  @Input() allowToSubmit!: boolean;
  @Input() submit$!: Subject<void>;

  constructor(
    private _modalService: ModalService,
  ) {}

  closeModal() {
    this._modalService.closeAll();
  }

  submitModal() {
    this.submit$.next();
    this.closeModal();
  }
}
