import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-entrypoint',
  template: '',
})
export class ModalEntrypointComponent<T extends MatDialogRef<T>>
  implements OnInit, OnDestroy
{
  private readonly _mdr!: MatDialogRef<T>;
  private readonly _destroy$ = new Subject<void>();
  private _modalComponent!: Type<T>;

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._modalComponent = this._route.snapshot.data['modalComponent'];
    this._mdr = this._dialog.open<T>(this._modalComponent);
  }

  ngOnInit(): void {
    this._mdr
      .afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe(() =>
        this._router.navigate(['../'], { relativeTo: this._route })
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();

    this._mdr.close();
  }
}
