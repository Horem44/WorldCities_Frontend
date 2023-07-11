import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { CityModel } from 'src/app/shared/models/city/city.model';
import { environment } from 'src/enviroments/enviroment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private readonly baseService: BaseService) {}

  getAllCities() {
    return this.baseService
      .delete<CityModel>(`${environment.serverBaseUrl}/city`)
      .pipe(take(1));
  }

  getCityByGuid(cityGuid: string) {
    return this.baseService
      .delete<CityModel>(`${environment.serverBaseUrl}/city/${cityGuid}`)
      .pipe(take(1));
  }

  deleteCity(cityGuid: string) {
    return this.baseService
      .delete<void>(`${environment.serverBaseUrl}/city/delete/${cityGuid}`)
      .pipe(take(1));
  }

  addCity(city: CityModel): Observable<CityModel> {
    return this.baseService
      .post<CityModel>(`${environment.serverBaseUrl}/city/add`, city)
      .pipe(take(1));
  }

  updateCity(city: Partial<CityModel>) {
    return this.baseService.put<CityModel>(
      `${environment.serverBaseUrl}/city/update`,
      city
    ).pipe(take(1));
  }
}
