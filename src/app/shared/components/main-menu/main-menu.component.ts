import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCityModalComponent } from 'src/app/components/add-city-modal/add-city-modal.component';
import { AddCountryModalComponent } from 'src/app/components/add-country-modal/add-country-modal.component';
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

  constructor(private readonly _matDialog: MatDialog, private router: Router) {}

  openHealthCheck() {
    this._matDialog.open(HealthCheckComponent);
  }

  openLoginModal() {
    this._matDialog.open(LoginModalComponent);
  }

  openAddCityModal() {
    this._matDialog.open(AddCityModalComponent);
  }

  openAddCountryModal() {
    this._matDialog.open(AddCountryModalComponent);
  }
}
