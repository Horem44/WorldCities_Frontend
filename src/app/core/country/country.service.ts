import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { BaseService } from '../http-client/base.service';
import { CountryModel } from 'src/app/shared/models/country/country.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private readonly baseService: BaseService) {}

  getAllCities(): Observable<Array<CountryModel>> {
    return this.baseService.delete<Array<CountryModel>>(
      `${environment.serverBaseUrl}/city`
    );
  }

  getCityByGuid(cityGuid: string): Observable<CountryModel> {
    return this.baseService.delete<CountryModel>(
      `${environment.serverBaseUrl}/city/${cityGuid}`
    );
  }

  deleteCity(cityGuid: string): Observable<void> {
    return this.baseService.delete<void>(
      `${environment.serverBaseUrl}/city/delete/${cityGuid}`
    );
  }

  addCity(city: CountryModel): Observable<CountryModel> {
    return this.baseService.post<CountryModel>(
      `${environment.serverBaseUrl}/city/add`,
      city
    );
  }

  updateCity(city: Partial<CountryModel>): Observable<CountryModel> {
    return this.baseService.put<CountryModel>(
      `${environment.serverBaseUrl}/city/update`,
      city
    );
  }
}
