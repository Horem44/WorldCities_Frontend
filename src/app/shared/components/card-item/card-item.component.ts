import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() useButtons = true;
  @Input() useImage = true;

  @Output() like$ = new EventEmitter<void>();
  @Output() dislike$ = new EventEmitter<void>();

  private isLiked = false;

  like(){
    this.isLiked = !this.isLiked;

    this.isLiked ? this.like$.emit() : this.dislike$.emit();
  }
}
