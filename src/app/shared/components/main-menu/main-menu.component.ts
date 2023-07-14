import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddCityModalComponent } from 'src/app/components/add-city-modal/add-city-modal.component';
import { HealthCheckComponent } from 'src/app/components/health-check/health-check.component';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ModalService } from 'src/app/core/modal/modal.service';
import { UserService } from 'src/app/core/user/user.service';
import { UserModel } from '../../models/user/user.model';
import { LogoutModalComponent } from 'src/app/components/logout-modal/logout-modal/logout-modal.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit, OnDestroy {
  isLogin = false;
  currentUser?: UserModel | null;

  isExpanded = true;
  showListsSubMenu = false;
  isShowing = false;
  showAddSubMenu = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly _modalService: ModalService,
    private readonly _authService: AuthService,
    private readonly _userService: UserService
  ) {}

  openHealthCheck() {
    this._modalService.open(HealthCheckComponent);
  }

  openLoginModal() {
    this._modalService.open(LoginModalComponent);
  }

  openLogoutModal() {
    this._modalService.open(LogoutModalComponent);
  }

  openAddCityModal() {
    this._modalService.open(AddCityModalComponent);
  }

  ngOnInit(): void {
    this._authService.login$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLogin) => {
        this.isLogin = isLogin;
        this.currentUser = this._userService.currentUser;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
