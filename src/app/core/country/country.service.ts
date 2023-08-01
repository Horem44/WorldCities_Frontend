import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { BaseService } from '../http-client/base.service';
import { CountryModel } from 'src/app/shared/models/country/country.model';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { CityService } from '../city/city.service';
import { AddCountryDto } from './dto/add-country.dto';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly countries$ = new BehaviorSubject<CountryModel[]>([]);

  constructor(
    private readonly _baseService: BaseService,
    private readonly _cityService: CityService
  ) {}

  addCountry(addCountryDto: AddCountryDto): Observable<string> {
    return this._baseService
      .post<string>(`${environment.serverBaseUrl}/country`, addCountryDto)
      .pipe(
        take(1),
      );
  }

  getAllCountries(): Observable<Array<CountryModel>> {
    return this._baseService
      .get<Array<CountryModel>>(`${environment.serverBaseUrl}/country`)
      .pipe(
        take(1),
        tap((countries) => this.countries$.next(countries))
      );
  }

  getCountries$(): BehaviorSubject<CountryModel[]> {
    return this.countries$;
  }
}
