import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CityService } from 'src/app/core/city/city.service';
import { GetterMethodType } from 'src/app/core/city/types/getter-methods.type';
import { LikeService } from 'src/app/core/like/like.service';
import { CityModel } from 'src/app/shared/models/city/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit {
  private methodKey: GetterMethodType;
  private routeParam!: string;
  private paramKey!: string;
  private getterObservable!: Observable<CityModel[]>;

  isLoading = true;

  cities$!: BehaviorSubject<CityModel[]>;

  constructor(
    private readonly _cityService: CityService,
    private _route: ActivatedRoute,
  ) {
    this.methodKey = this._route.snapshot.data['methodKey'];
    this.paramKey = this._route.snapshot.data['paramKey'];

    if (this.paramKey) {
      this.routeParam = this._route.snapshot.paramMap.get(this.paramKey)!;
    }
  }

  ngOnInit(): void {
    this.cities$ = this._cityService.getCities$();

    switch (this.methodKey) {
      case 'getAllCities':
        this.getterObservable = this._cityService.getAllCities();
        break;
      case 'getUserCities':
        this.getterObservable = this._cityService.getUserCities();
        break;
      case 'getLikedCities':
        this.getterObservable = this._cityService.getLikedCities();
        break;
      case 'getCountryCities':
        this.getterObservable = this._cityService.getCountryCities(
          this.routeParam
        );
        break;
    }

    this.getterObservable.subscribe(() => (this.isLoading = false));
  }
}
