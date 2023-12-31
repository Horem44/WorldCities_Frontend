import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HealthCheckComponent } from './components/health-check/health-check.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddCityModalComponent } from './components/add-city-modal/add-city-modal.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { AuthInterceptor } from './shared/interceptors/auth/auth.interceptor';
import { RegisterModalComponent } from './components/register-modal/register-modal/register-modal.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal/logout-modal.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { GlobalErrorHandler } from './shared/error-handler/error-handler.service';
import { HttpLoadingInterceptor } from './shared/interceptors/loading/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HealthCheckComponent,
    HomeComponent,
    LoginModalComponent,
    RegisterModalComponent,
    LogoutModalComponent,
    AddCityModalComponent,
    CountriesListComponent,
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
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
