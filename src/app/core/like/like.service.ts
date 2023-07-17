import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { CityService } from '../city/city.service';
import { environment } from 'src/enviroments/enviroment';
import { catchError, of, switchMap, take, tap } from 'rxjs';
import { LikeDto } from 'src/app/shared/dtos/like/like.dto';
import { HubService } from '../hub/hub.service';
import * as signalR from '@microsoft/signalr';
import { LikeModel } from 'src/app/shared/models/like/like.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private _cityHub!: signalR.HubConnection;

  constructor(
    private readonly _baseService: BaseService,
    private readonly _cityService: CityService,
    private readonly _userService: UserService
  ) {}

  addLike(likeDto: LikeDto) {
    return this._baseService
      .get<boolean>(
        `${environment.serverBaseUrl}/like/is-already-liked/${likeDto.cityGuid}`
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
        take(1),
        tap((like) => {
          if (like) {
            this.sendIncreaseCityLikesCount(likeDto.cityGuid);
          }
        })
      );
  }

  removeLike(likeDto: LikeDto) {
    return this._baseService
      .delete<void>(`${environment.serverBaseUrl}/like/${likeDto.cityGuid}`)
      .pipe(
        take(1),
        tap(() => this.sendDecreaseCityLikesCount(likeDto.cityGuid))
      );
  }

  startConnection() {
    this._cityHub = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.serverBaseUrl + '/city-hub', {
        withCredentials: false,
      })
      .build();
    console.log('Starting connection to city hub...');
    this._cityHub
      .start()
      .then(() => console.log('Connection started.'))
      .catch((err: any) => console.log(err));
  }

  private sendIncreaseCityLikesCount(cityGuid: string) {
    this._cityHub.invoke('increaseCityLikesCountClient', cityGuid);
  }

  private sendDecreaseCityLikesCount(cityGuid: string) {
    this._cityHub.invoke('decreaseCityLikesCountClient', cityGuid);
  }

  addDataListeners() {
    this._cityHub.on('increaseCityLikesCount', (cityGuid) => {
      console.log(
        'Update issued by server for the following reason: ' + cityGuid
      );
      this.updateCityLikes(cityGuid, true);
    });

    this._cityHub.on('decreaseCityLikesCount', (cityGuid) => {
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
