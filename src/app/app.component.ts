import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading = true;

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this._authService
      .authenticate()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((user) => {
        if (user) {
          console.log(user);
          this._userService.currentUser = user;
        }
      });
  }
}
