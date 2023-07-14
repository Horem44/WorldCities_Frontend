import { Component, Input } from '@angular/core';
import { CityModel } from '../../models/city/city.model';
import { environment } from 'src/enviroments/enviroment';
import { LikeService } from 'src/app/core/like/like.service';
import { LikeDto } from '../../dtos/like/like.dto';
import { ModalService } from 'src/app/core/modal/modal.service';
import { ShareModalComponent } from 'src/app/components/share-modal/share-modal.component';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss'],
})
export class CityItemComponent {
  @Input() city!: CityModel;

  get cityImageUrl() {
    return `${environment.serverBaseUrl}/city/image/${this.city.cityImageGuid}`;
  }

  constructor(
    private readonly _likeService: LikeService,
    private readonly _modalService: ModalService
  ) {}

  like() {
    this._likeService.addLike(new LikeDto(this.city.guid)).subscribe();
  }

  dislike() {
    this._likeService.removeLike(new LikeDto(this.city.guid)).subscribe();
  }

  share() {
    this._modalService.open(ShareModalComponent);
  }
}
