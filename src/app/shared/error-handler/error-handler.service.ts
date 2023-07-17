import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private readonly _errorDialogService: ErrorDialogService,
  ) {}

  handleError(error: any) {
    console.log(error);

    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; 
    }

    if (error && error.status === 401) {
      return;
    }

    this.zone.run(() =>
      this._errorDialogService.openDialog(
        error?.message || 'Undefined client error'
      )
    );
  }
}
