import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CityService } from 'src/app/core/city/city.service';
import { CityModel } from 'src/app/shared/models/city/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  isLoading = true;

  cities$!: BehaviorSubject<CityModel[]>;

  constructor(private readonly _cityService: CityService){}

  ngOnInit(): void {
    this.cities$ = this._cityService.getCities$();
    this._cityService.getAllCities().subscribe(() => this.isLoading = false);
  }
}
