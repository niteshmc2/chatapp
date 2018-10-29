import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {AppConstants} from '../common/app-constants';

@Injectable()
export class UserLoginService {

  isUserLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  login(email: String, password: String): Observable<any> {
    return this.http.post<User>(`${AppConstants.LOGIN_URL}`, {'email': email, 'password': password});
  }

  getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  setIsUserLogged(value: boolean) {
    this.isUserLoggedIn = value;
  }
}
