import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  set currentUser(user: UserModel | null) {
    this._currentUser = user;
  }

  get currentUser(): UserModel | null {
    return this._currentUser;
  }

  private _currentUser!: UserModel | null;

  constructor() {}
}
