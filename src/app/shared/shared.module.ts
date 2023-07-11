import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { AppRoutingModule } from '../app-routing.module';
import { ModalEntrypointComponent } from './components/modal-entrypoint/modal-entrypoint.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CityItemComponent } from './components/city-item/city-item.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    ConfirmModalComponent,
    ModalEntrypointComponent,
    CardItemComponent,
    CityItemComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  exports: [
    MainMenuComponent,
    ConfirmModalComponent,
    ModalEntrypointComponent,
    CardItemComponent,
    CityItemComponent,
  ],
})
export class SharedModule {}
