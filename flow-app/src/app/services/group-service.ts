import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../common/app-constants';
import {Observable} from 'rxjs/Observable';
import {HeaderService} from './header-service';


@Injectable()
export class GroupService {
  constructor(private http: HttpClient, private headerSerice: HeaderService) {

  }

  getGroup(id: string): Observable<any> {
    return this.http.get<any>(`${AppConstants.GROUPS_URL}/${id}`, {headers: this.headerSerice.getHeader()});
  }

  checkIfAlreadyExist(members: Array<String>): Observable<any> {
    return this.http.post<any>(`${AppConstants.GROUPS_CHECK_URL}`, {members: members});
  }

  createGroup(members: Array<String>,groupName: String): Observable<any> {
    return this.http.post<any>(`${AppConstants.GROUPS_URL}`, {
      name: groupName,
      members: members
    }, {headers: this.headerSerice.getHeader()});
  }

}
