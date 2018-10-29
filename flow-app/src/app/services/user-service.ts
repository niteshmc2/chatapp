import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {AppConstants} from '../common/app-constants';
import {HttpHeaders} from '@angular/common/http';
import {headersToString} from 'selenium-webdriver/http';
import {HeaderService} from './header-service';


@Injectable()
export class UserService {
  constructor(private http: HttpClient, private headerService: HeaderService) {
  }

  getUserDetails(username: String): Observable<User> {
    return this.http.get<User>(`${AppConstants.USERS_URL}/${username}`, {headers: this.headerService.getHeader()});
  }

  createUser(name: String, email: String, password: String, role: String): Observable<User> {
    return this.http.post<User>(`${AppConstants.USERS_URL}`, {
      'name': name,
      'role': role,
      'email': email,
      'password': password,
      'groups': []
    });
  }

  searchUser(input: String): Observable<any> {
    return this.http.post<any>(`${AppConstants.USERS_URL}/search`, {
      search: input
    }, {headers: this.headerService.getHeader()});
  }

  deleteUser(input: String): Observable<any> {
    return this.http.delete<any>(`${AppConstants.USERS_URL}/${input}`, {headers: this.headerService.getHeader()});
  }

  updateUser(id:String, params: {}): Observable<any>{
    return this.http.put<any>(`${AppConstants.USERS_URL}/${id}`,params,{headers: this.headerService.getHeader()});
  }
}
