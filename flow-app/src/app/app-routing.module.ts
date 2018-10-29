import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    pathMatch : 'full',
    component: LoginComponent
  },
  {
    path : 'signup',
    component: SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'chat',
    component: ChatComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'profile/:email',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
