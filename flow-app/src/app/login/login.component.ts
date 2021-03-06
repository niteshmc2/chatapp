import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {UserLoginService} from '../services/user-login.service';
import {AuthGuard} from '../auth.guard';
import {HeaderService} from '../services/header-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  uname: String;
  password: String;

  constructor(private router: Router, private userLoginService: UserLoginService, private authguard: AuthGuard, private headerService: HeaderService) {
  }

  ngOnInit() {
    if (localStorage.getItem('flowToken') != undefined) {
      this.userLoginService.setIsUserLogged(true);
      this.goToChat(null);
    }
  }

  login(event) {
    event.preventDefault();
    
    if(this.uname == undefined || this.password == undefined || this.uname.trim() === "" || this.password.trim() === ""){
      return;
    }
    let loggedInUser = this.userLoginService.login(this.uname, this.password).toPromise();
    loggedInUser.then(user => {
      this.setToken(user);
      this.userLoginService.setIsUserLogged(true);
      this.headerService.setHeader();
      this.goToChat(event);
    }).catch(() => {
      alert('Could not find account');
      this.userLoginService.setIsUserLogged(false);
    });

  }

  setToken(user) {
    localStorage.setItem('flowToken', user.token);
    localStorage.setItem('flowUser', user.username);
  }

  goToChat(event) {
    this.router.navigate(['chat']);
  }

  goToSignUp(event) {
    this.router.navigate(['signup']);
  }

}
