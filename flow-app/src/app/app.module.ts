import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ChatComponent} from './chat/chat.component';
import {ProfileComponent} from './profile/profile.component';
import {UserLoginService} from './services/user-login.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth.guard';
import { UserService } from './services/user-service';
import { GroupService } from './services/group-service';
import { MessageService } from './services/messages-service';
import { MaterializeModule } from 'angular2-materialize';
import { GroupListComponent } from './group-list/group-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { EmailValidator } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import {HeaderService} from './services/header-service';
import { CheckPasswordDirective } from './services/check-password.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    ProfileComponent,
    GroupListComponent,
    ChatBoxComponent,
    CheckPasswordDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  
  providers: [UserLoginService, UserService, AuthGuard, GroupService, MessageService, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
