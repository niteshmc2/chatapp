import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserLoginService} from '../services/user-login.service';
import {UserService} from '../services/user-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailValidator } from '@angular/forms';
// import { patternValidator } from 'app/shared/pattern-validator';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  name: String;
  email: String;
  password: String;
  confirmPassword: String;
  selectedRole: String;
  myform: FormGroup;
  field: FormGroup;

  roles: Array<String> = ['Student', 'Professor'];

  constructor(private router: Router, private userService: UserService) {
    this.selectedRole = this.roles[0];
    console.log(this.selectedRole);
    // this.field = new FormGroup('', CustomValidators.email)
    // this.myform = new FormGroup({
    //   field: new FormControl('', CustomValidators.email)
    // });
  }

  ngOnInit() {
    
  }

  setRole(event) {
    this.selectedRole = event.target;
  }

  signUp(event) {
    event.preventDefault();
    if(this.name == undefined || this.password == undefined || this.name.trim() === "" || this.password.trim() === ""
     || this.confirmPassword == undefined || this.confirmPassword.trim() === "" || this.email == undefined || this.email.trim() === "" 
  ){
      return;
    }
   
    if (this.password == this.confirmPassword) {
      this.userService.createUser(this.name, this.email, this.password, "student").toPromise()
        .then((user) => {
          console.log(user);
          this.goToLogin(event);
        }).catch(() => {
        alert('Account already exists');
      });
    }


    // event.preventDefault();
    // let loggedInUser = this.userLoginService.login(this.uname, this.password).toPromise();
    // loggedInUser.then(user => {
    //   this.setToken(user);
    //   this.userLoginService.setIsUserLogged(true);
    //   this.goToChat(event);
    // }).catch(() => {
    //   alert("Could not find account");
    //   this.userLoginService.setIsUserLogged(false);
    // });
  }

  goToLogin(event) {
    this.router.navigate(['']);
  }
}
