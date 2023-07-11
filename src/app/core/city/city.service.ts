import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { CityModel } from 'src/app/shared/models/city/city.model';
import { environment } from 'src/enviroments/enviroment';
import { Observable, BehaviorSubject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly cities$ = new BehaviorSubject<CityModel[]>([]);

  constructor(private readonly baseService: BaseService) {}

  getAllCities() {
    return this.baseService
      .get<CityModel[]>(`${environment.serverBaseUrl}/city`)
      .pipe(
        take(1),
        tap((cities) => this.cities$.next(cities))
      );
  }

  getCityByGuid(cityGuid: string) {
    return this.baseService
      .get<CityModel>(`${environment.serverBaseUrl}/city/${cityGuid}`)
      .pipe(take(1));
  }

  deleteCity(cityGuid: string) {
    return this.baseService
      .delete<void>(`${environment.serverBaseUrl}/city/${cityGuid}`)
      .pipe(take(1));
  }

  addCity(city: CityModel): Observable<CityModel> {
    return this.baseService
      .post<CityModel>(`${environment.serverBaseUrl}/city`, city)
      .pipe(
        take(1),
        tap((city) => this.cities$.next([...this.cities$.getValue(), city]))
      );
  }

  updateCity(city: Partial<CityModel>) {
    return this.baseService
      .put<CityModel>(`${environment.serverBaseUrl}/city`, city)
      .pipe(take(1));
  }

  getCities$(): BehaviorSubject<CityModel[]> {
    return this.cities$;
  }
}
