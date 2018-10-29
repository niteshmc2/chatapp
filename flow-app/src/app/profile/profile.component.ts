import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {UserService} from './../services/user-service';
import {UserLoginService} from '../services/user-login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: String;
  user;
  oldPassword : String;
  resetPassword : String;
  confirmPassword : String;
  private sub: any;
  oldPswForDel;
  password;
  reset;
  oldPsw;

  constructor(private router: Router, private userLoginService: UserLoginService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    this.email = params['email'];
  });
  if (localStorage.getItem('flowToken') == undefined) {
    this.router.navigate(['login']);
  }
  let loggedInUser = this.userService.getUserDetails(this.email).toPromise();
  loggedInUser.then(user => {
    this.user = user;
  }).catch((e) => {
    console.log(e);
    //alert("Some error");
  });
}
  goToChat(event){
    this.router.navigate(['chat'])
  }

  delete(event){
    event.preventDefault();
    let loggedInUser = this.userLoginService.login(this.email, this.oldPswForDel).toPromise();
    loggedInUser.then(user => {
      let deleteUser = this.userService.deleteUser(this.user._id).toPromise();
      deleteUser.then(
      res => {
       alert("account deleted");
       localStorage.removeItem('flowToken');
       localStorage.removeItem('flowUser');
       this.router.navigate(['login']);
    }
   ).catch((e)=>{alert("Something went wrong");});
    }).catch((e) => {
      alert('Wrong password');
      //this.userLoginService.setIsUserLogged(false);
    });
  }

  
  resetConfirm(event){
    if(this.reset === this.password){
    event.preventDefault();
    let loggedInUser = this.userLoginService.login(this.email, this.oldPsw).toPromise();
    loggedInUser.then(user => {
      let updateUser = this.userService.updateUser(this.user._id,{password:this.password}).toPromise();
      updateUser.then( res => {
        alert("password updated");
       localStorage.removeItem('flowToken');
       localStorage.removeItem('flowUser');
       this.router.navigate(['login']);
      }).catch((e)=>alert("Something went wrong"));
    }).catch((e)=>alert("Wrong password"));
    }
  }
}
