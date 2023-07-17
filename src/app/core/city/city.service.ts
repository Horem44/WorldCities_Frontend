import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { CityModel } from 'src/app/shared/models/city/city.model';
import { environment } from 'src/enviroments/enviroment';
import { Observable, BehaviorSubject, take, tap } from 'rxjs';
import { AddCityDto } from 'src/app/shared/dtos/city/add-city.dto';
import { GetterMethodType } from './types/getter-methods.type';
import { Params } from '@angular/router';
import { HubService } from '../hub/hub.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly cities$ = new BehaviorSubject<CityModel[]>([]);
  private _cityHub!: signalR.HubConnection;

  constructor(
    private readonly _baseService: BaseService,
    private readonly _hubService: HubService
  ) {}

  getUserCities() {
    return this._baseService
      .get<CityModel[]>(`${environment.serverBaseUrl}/city`)
      .pipe(
        take(1),
        tap((cities) => this.cities$.next(cities))
      );
  }

  getAllCities() {
    return this._baseService
      .get<CityModel[]>(`${environment.serverBaseUrl}/city/all`)
      .pipe(
        take(1),
        tap((cities) => this.cities$.next(cities))
      );
  }

  getLikedCities() {
    return this._baseService
      .get<CityModel[]>(`${environment.serverBaseUrl}/city/liked`)
      .pipe(
        take(1),
        tap((cities) => this.cities$.next(cities))
      );
  }

  getCityByGuid(cityGuid: string) {
    return this._baseService
      .get<CityModel>(`${environment.serverBaseUrl}/city/${cityGuid}`)
      .pipe(take(1));
  }

  deleteCity(cityGuid: string) {
    return this._baseService
      .delete<void>(`${environment.serverBaseUrl}/city/${cityGuid}`)
      .pipe(take(1));
  }

  addCity(city: AddCityDto): Observable<CityModel> {
    const formData = new FormData();

    Object.keys(city).forEach((key) => {
      if (city[key] instanceof Blob) {
        formData.append(
          'file',
          <Blob>city[key],
          Date.now().toLocaleString + '.jpg'
        );
      } else {
        formData.append(key, city[key]!.toString());
      }
    });

    return this._baseService
      .post<CityModel>(`${environment.serverBaseUrl}/city`, formData)
      .pipe(
        take(1),
        tap((city) => this.cities$.next([...this.cities$.getValue(), city]))
      );
  }

  updateCity(city: Partial<CityModel>) {
    return this._baseService
      .put<CityModel>(`${environment.serverBaseUrl}/city`, city)
      .pipe(take(1));
  }

  getCountryCities(countryGuid: string) {
    return this._baseService
      .get<Array<CityModel>>(
        `${environment.serverBaseUrl}/country/${countryGuid}`
      )
      .pipe(
        take(1),
        tap((cities) => this.cities$.next(cities))
      );
  }

  getCities$(): BehaviorSubject<CityModel[]> {
    return this.cities$;
  }
}
