import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

let header = new HttpHeaders()
  .set('Authorization', localStorage.getItem('flowToken'))
  .set('Content-Type', 'application/json');

@Injectable()
export class HeaderService {
  constructor(private http: HttpClient) {

  }

  getHeader(): HttpHeaders {
    return header;
  }

  setHeader() {
    header = new HttpHeaders()
      .set('Authorization', localStorage.getItem('flowToken'))
      .set('Content-Type', 'application/json');
  }
}
