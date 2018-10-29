import {Component, OnInit} from '@angular/core';
import {EventEmitter, Input, Output} from '@angular/core';
import {MessageService} from './../services/messages-service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  constructor(private messageService: MessageService) {
  }

  messages;
  name;
  group;
  message;
  user;
  show;

  ngOnInit() {
  }

  loadMessages(group, user) {
    this.show = true;
    this.user = user;
    this.group = group;
    this.name = group.groupname;
    let messageCall = this.messageService.getMessages(group.groupid).toPromise();
    messageCall.then(messages => this.messages = messages);
  }

  sendMessage(event) {
    if (this.message != '') {
      let sendMsgCall = this.messageService.sendAmessage(this.group.groupid, this.message, this.user.email).toPromise();
      sendMsgCall.then((message)=>{
        this.message='';
        this.messages.push(message);
      });
    }
  }
}
