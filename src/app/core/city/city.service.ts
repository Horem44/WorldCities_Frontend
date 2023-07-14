import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { CityModel } from 'src/app/shared/models/city/city.model';
import { environment } from 'src/enviroments/enviroment';
import { Observable, BehaviorSubject, take, tap } from 'rxjs';
import { AddCityDto } from 'src/app/shared/dtos/city/add-city.dto';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly cities$ = new BehaviorSubject<CityModel[]>([]);

  constructor(private readonly baseService: BaseService) {}

  getCities(all: boolean = false) {
    const urlPrefix = all ? '/city/all' : '/city';

    return this.baseService
      .get<CityModel[]>(`${environment.serverBaseUrl}${urlPrefix}`)
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

  addCity(city: AddCityDto): Observable<CityModel> {
    const formData = new FormData();

    Object.keys(city).forEach(key => {
      if(city[key] instanceof Blob){
        formData.append('file', <Blob>city[key], Date.now().toLocaleString + '.jpg');
      }else{
        formData.append(key, city[key]!.toString());
      }
    });

    return this.baseService
      .post<CityModel>(`${environment.serverBaseUrl}/city`, formData)
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
