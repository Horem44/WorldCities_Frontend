import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { CityModel } from 'src/app/shared/models/city/city.model';
import { environment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private readonly baseService: BaseService) {}

  getAllCities() {
    return this.baseService.delete<CityModel>(
      `${environment.serverBaseUrl}/city`
    );
  }

  getCityByGuid(cityGuid: string) {
    return this.baseService.delete<CityModel>(
      `${environment.serverBaseUrl}/city/${cityGuid}`
    );
  }

  deleteCity(cityGuid: string) {
    return this.baseService.delete<void>(
      `${environment.serverBaseUrl}/city/delete/${cityGuid}`
    );
  }

  addCity(city: CityModel): Observable<CityModel> {
    return this.baseService.post<CityModel>(
      `${environment.serverBaseUrl}/city/add`,
      city
    );
  }

  updateCity(city: Partial<CityModel>) {
    return this.baseService.put<CityModel>(
      `${environment.serverBaseUrl}/city/update`,
      city
    );
  }
}
