import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HealthCheckComponent } from 'src/app/components/health-check/health-check.component';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  isExpanded = true;
  showListsSubMenu = false;
  isShowing = false;
  showAddSubMenu = false;

  constructor(private readonly _matDialog: MatDialog) {}

  openHealthCheck() {
    this._matDialog.open(HealthCheckComponent);
  }

  openLoginModal() {
    this._matDialog.open(LoginModalComponent);
  }
}
