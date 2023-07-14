import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CityService } from 'src/app/core/city/city.service';
import { CityModel } from 'src/app/shared/models/city/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit {
  private loadAll = false;

  isLoading = true;

  cities$!: BehaviorSubject<CityModel[]>;

  constructor(
    private readonly _cityService: CityService,
    private _route: ActivatedRoute
  ) {
    this.loadAll = this._route.snapshot.data['loadAll'];
  }

  ngOnInit(): void {
    this.cities$ = this._cityService.getCities$();
    this._cityService
      .getCities(this.loadAll)
      .subscribe(() => (this.isLoading = false));
  }
}
