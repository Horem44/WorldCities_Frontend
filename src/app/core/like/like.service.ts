import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { CityService } from '../city/city.service';
import { environment } from 'src/enviroments/enviroment';
import { of, switchMap, take, tap } from 'rxjs';
import { LikeDto } from 'src/app/shared/dtos/like/like.dto';
import * as signalR from '@microsoft/signalr';
import { LikeModel } from 'src/app/shared/models/like/like.model';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private _likeHub!: signalR.HubConnection;

  constructor(
    private readonly _baseService: BaseService,
    private readonly _cityService: CityService,
  ) {}

  addLike(likeDto: LikeDto) {
    return this._baseService
      .get<boolean>(
        `${environment.serverBaseUrl}/like/is-already-liked/${likeDto.cityId}`
      )
      .pipe(
        switchMap((isCityAlreadyLiked) => {
          if (!isCityAlreadyLiked) {
            return this._baseService.post<LikeModel>(
              `${environment.serverBaseUrl}/like`,
              likeDto
            );
          } else {
            this.removeLike(likeDto).subscribe();
            return of(null);
          }
        }),
        take(1)
      );
  }

  removeLike(likeDto: LikeDto) {
    return this._baseService
      .delete<void>(`${environment.serverBaseUrl}/like/${likeDto.cityId}`)
      .pipe(take(1));
  }

  startConnection() {
    this._likeHub = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.serverBaseUrl + '/like-hub', {
        withCredentials: false,
      })
      .build();
    console.log('Starting connection to like hub...');
    this._likeHub
      .start()
      .then(() => console.log('Connection started.'))
      .catch((err: any) => console.log(err));
  }

  addDataListeners() {
    this._likeHub.on('IncreaseCityLikes', (cityGuid) => {
      console.log(
        'Update issued by server for the following reason: ' + cityGuid
      );
      this.updateCityLikes(cityGuid, true);
    });

    this._likeHub.on('DecreaseCityLikes', (cityGuid) => {
      console.log(
        'Update issued by server for the following reason: ' + cityGuid
      );
      this.updateCityLikes(cityGuid, false);
    });
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
