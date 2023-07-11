import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { BaseService } from '../http-client/base.service';
import { CountryModel } from 'src/app/shared/models/country/country.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private readonly baseService: BaseService) {}

  getAllCountry(): Observable<Array<CountryModel>> {
    return this.baseService.delete<Array<CountryModel>>(
      `${environment.serverBaseUrl}/city`
    ).pipe(take(1));
  }

  getCountryByGuid(cityGuid: string): Observable<CountryModel> {
    return this.baseService.delete<CountryModel>(
      `${environment.serverBaseUrl}/city/${cityGuid}`
    ).pipe(take(1));
  }

  deleteCountry(cityGuid: string): Observable<void> {
    return this.baseService.delete<void>(
      `${environment.serverBaseUrl}/city/delete/${cityGuid}`
    ).pipe(take(1));
  }

  addCountry(city: CountryModel): Observable<CountryModel> {
    return this.baseService
      .post<CountryModel>(`${environment.serverBaseUrl}/city/add`, city)
      .pipe(take(1));
  }

  updateCountry(city: Partial<CountryModel>): Observable<CountryModel> {
    return this.baseService
      .put<CountryModel>(`${environment.serverBaseUrl}/city/update`, city)
      .pipe(take(1));
  }
}
