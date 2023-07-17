import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user/user.model';
import { BaseService } from '../http-client/base.service';
import { environment } from 'src/enviroments/enviroment';
import { BehaviorSubject, Observable, distinctUntilChanged, startWith, switchMap, take, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _users$ = new BehaviorSubject<UserModel[]>([]);

  set currentUser(user: UserModel | null) {
    this._currentUser = user;
  }

  get currentUser(): UserModel | null {
    return this._currentUser;
  }

  get isAuth(){
    return !!this.currentUser;
  }

  private _currentUser!: UserModel | null;

  constructor(private readonly _baseService: BaseService) {}

  getUsers$(){
    return this._users$;
  }
}
