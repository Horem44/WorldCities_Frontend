import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
})
export class LogoutModalComponent implements OnInit, OnDestroy {
  submit$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly _authService: AuthService) {}

  submit() {
    this._authService.logout().subscribe();
  }

  ngOnInit(): void {
    this.submit$.pipe(take(1)).subscribe(() => this.submit());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
