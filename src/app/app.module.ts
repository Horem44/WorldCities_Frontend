import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HealthCheckComponent } from './components/health-check/health-check.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from './shared/components/main-menu/main-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddCityModalComponent } from './components/add-city-modal/add-city-modal.component';
import { AddCountryModalComponent } from './components/add-country-modal/add-country-modal.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { AuthInterceptor } from './shared/interceptors/auth/auth.interceptor';
import { RegisterModalComponent } from './components/register-modal/register-modal/register-modal.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal/logout-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HealthCheckComponent,
    HomeComponent,
    LoginModalComponent,
    RegisterModalComponent,
    LogoutModalComponent,
    AddCityModalComponent,
    AddCountryModalComponent,
    CityListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
