import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { IFindCity } from './interfaces/find-city.interface';
import { IHttpOptions } from '../http-client/interfaces/http-options.interface';
import { environment } from 'src/enviroments/enviroment';
import { HttpHeaders } from '@angular/common/http';
import { timer, distinctUntilChanged, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FindCityService {
  private readonly findCityApiHeader = new HttpHeaders().set(
    'X-Api-Key',
    environment.cityApiKey
  );

  private readonly findCityHttpOptions: IHttpOptions = {
    headers: this.findCityApiHeader,
  };

  constructor(private readonly _baseService: BaseService) {}

  debounceFindCity(cityName: string) {
    return timer(100).pipe(
      distinctUntilChanged(),
      switchMap(() => this.findCityByName(cityName.trim()))
    );
  }

  private findCityByName(cityName: string) {
    return this._baseService.get<IFindCity[]>(
      `https://api.api-ninjas.com/v1/city?name=${cityName}&limit=10`,
      this.findCityHttpOptions
    );
  }
}
