import { Component } from '@angular/core';
import { AddCityModalComponent } from 'src/app/components/add-city-modal/add-city-modal.component';
import { AddCountryModalComponent } from 'src/app/components/add-country-modal/add-country-modal.component';
import { HealthCheckComponent } from 'src/app/components/health-check/health-check.component';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';
import { ModalService } from 'src/app/core/modal/modal.service';

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

  constructor(
    private readonly _modalService: ModalService,
  ) {}

  openHealthCheck() {
    this._modalService.open(HealthCheckComponent);
  }

  openLoginModal() {
    this._modalService.open(LoginModalComponent);
  }

  openAddCityModal() {
    this._modalService.open(AddCityModalComponent);
  }

  openAddCountryModal() {
    this._modalService.open(AddCountryModalComponent);
  }
}
