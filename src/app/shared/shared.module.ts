import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [MainMenuComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  exports: [MainMenuComponent, ConfirmModalComponent],
})
export class SharedModule {}
