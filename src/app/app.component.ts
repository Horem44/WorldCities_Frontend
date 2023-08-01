import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { catchError, finalize } from 'rxjs';
import { LikeService } from './core/like/like.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _likeService: LikeService,
  ) {}

  ngOnInit(): void {
    this._likeService.startConnection();
    this._likeService.addDataListeners();

    this._authService
      .authorize()
      .subscribe((user) => {
        if (user) {
          this._userService.currentUser = user;
        }
      });
  }
}
