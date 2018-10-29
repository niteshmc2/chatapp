import { Component } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import {MessageService} from './services/messages-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private messageService: MessageService) {}
}
