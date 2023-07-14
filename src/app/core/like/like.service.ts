import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { CityService } from '../city/city.service';
import { environment } from 'src/enviroments/enviroment';
import { catchError, take, tap } from 'rxjs';
import { LikeDto } from 'src/app/shared/dtos/like/like.dto';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(
    private readonly _baseService: BaseService,
    private readonly _cityService: CityService
  ) {}

  addLike(likeDto: LikeDto) {
    return this._baseService
      .post<void>(`${environment.serverBaseUrl}/like`, likeDto)
      .pipe(
        take(1),
        tap(() => this.updateCityLikes(likeDto.cityGuid, true)),
      );
  }

  removeLike(likeDto: LikeDto) {
    return this._baseService
      .delete<void>(`${environment.serverBaseUrl}/like/${likeDto.cityGuid}`)
      .pipe(
        take(1),
        tap(() => this.updateCityLikes(likeDto.cityGuid, false))
      );
  }

  private updateCityLikes(cityGuid: string, increase: boolean) {
    const cities$ = this._cityService.getCities$();
    const citiesList = cities$.getValue();

    const cityToUpdate = citiesList.find((city) => city.guid === cityGuid);

    if (!cityToUpdate) {
      return;
    }

    increase ? cityToUpdate.likesCount++ : cityToUpdate.likesCount--;

    cities$.next(citiesList);
  }
}
