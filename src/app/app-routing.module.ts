import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModalEntrypointComponent } from './shared/components/modal-entrypoint/modal-entrypoint.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { AddCityModalComponent } from './components/add-city-modal/add-city-modal.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { RegisterModalComponent } from './components/register-modal/register-modal/register-modal.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal/logout-modal.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'World Cities',
  },
  {
    path: 'login',
    component: ModalEntrypointComponent<LoginModalComponent>,
    data: {
      modalComponent: LoginModalComponent,
    },
  },
  {
    path: 'register',
    component: ModalEntrypointComponent<RegisterModalComponent>,
    data: {
      modalComponent: RegisterModalComponent,
    },
  },
  {
    path: 'logout',
    component: ModalEntrypointComponent<LogoutModalComponent>,
    data: {
      modalComponent: LogoutModalComponent,
    },
  },
  {
    path: 'add-city',
    component: ModalEntrypointComponent<AddCityModalComponent>,
    canActivate: [AuthGuardService],
    data: {
      modalComponent: AddCityModalComponent,
    },
  },
  {
    path: 'cities-list',
    component: CityListComponent,
    canActivate: [AuthGuardService],
    data: { methodKey: 'getUserCities' },
  },
  {
    path: 'countries-list/:countryGuid',
    component: CityListComponent,
    canActivate: [AuthGuardService],
    data: { methodKey: 'getCountryCities', paramKey: 'countryGuid' },
  },
  {
    path: 'countries-list',
    canActivate: [AuthGuardService],
    component: CountriesListComponent,
  },
  {
    path: 'cities-list/liked',
    component: CityListComponent,
    canActivate: [AuthGuardService],
    data: { methodKey: 'getLikedCities' },
  },
  {
    path: 'all',
    component: CityListComponent,
    canActivate: [AuthGuardService],
    data: { methodKey: 'getAllCities' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
