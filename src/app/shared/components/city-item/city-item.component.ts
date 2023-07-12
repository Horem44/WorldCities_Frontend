import { Component, Input } from '@angular/core';
import { CityModel } from '../../models/city/city.model';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent {
  @Input() city!: CityModel;

  get cityImageUrl(){
    return `${environment.serverBaseUrl}/city/image/${this.city.cityImageGuid}`
  }
}
