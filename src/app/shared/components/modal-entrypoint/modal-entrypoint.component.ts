import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/core/modal/modal.service';

@Component({
  selector: 'app-modal-entrypoint',
  template: '',
})
export class ModalEntrypointComponent<T> implements OnInit, OnDestroy {
  private readonly _mdr!: MatDialogRef<T>;
  private readonly _destroy$ = new Subject<void>();
  private _modalComponent!: Type<T>;

  constructor(
    private _modalService: ModalService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    this._modalComponent = this._route.snapshot.data['modalComponent'];
    this._mdr = this._modalService.open<T>(this._modalComponent);
  }

  ngOnInit(): void {
    this._mdr
      .afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe(() =>
        this._location.back()
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();

    this._mdr.close();
  }
}
