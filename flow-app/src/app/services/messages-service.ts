import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../common/app-constants';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HeaderService} from './header-service';
import * as io from 'socket.io-client';

@Injectable()
export class MessageService {

  private socket = io(`${AppConstants.STICKY_SERVER_BASE_URL}`);

  constructor(private http: HttpClient, private headerService: HeaderService) {

  }

  getMessages(id: string): Observable<any> {
    let req = {
      conversationId: id
    };
    return this.http.post<any>(`${AppConstants.MESSAGES_URL}/search`, req, {headers: this.headerService.getHeader()});
  }

  sendAmessage(convId, msgBody, author): Observable<any> {
    this.socket.emit('send message');
    return this.http.post<any>(`${AppConstants.MESSAGES_URL}`, {
      conversationId: convId,
      body: msgBody,
      from: author,
      timestamp: Date.now()
    }, {headers: this.headerService.getHeader()});
  }

  receiveMessage(component): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('receive message',() => {
        component.ngOnInit();
      });

    });
  }
}
