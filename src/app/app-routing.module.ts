import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModalEntrypointComponent } from './shared/components/modal-entrypoint/modal-entrypoint.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { AddCityModalComponent } from './components/add-city-modal/add-city-modal.component';
import { AddCountryModalComponent } from './components/add-country-modal/add-country-modal.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { RegisterModalComponent } from './components/register-modal/register-modal/register-modal.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal/logout-modal.component';

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
    data: {
      modalComponent: AddCityModalComponent,
    },
  },
  {
    path: 'add-country',
    component: ModalEntrypointComponent<AddCountryModalComponent>,
    data: {
      modalComponent: AddCountryModalComponent,
    },
  },
  {
    path: 'cities-list',
    component: CityListComponent,
    children: [],
  },
  { path: 'all', component: CityListComponent, data: { loadAll: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
