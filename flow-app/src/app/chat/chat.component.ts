import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './../services/user-service';
import {MessageService} from './../services/messages-service';
import {GroupService} from './../services/group-service';
import {EventEmitter, Input, Output} from '@angular/core';
import {GroupListComponent} from '../group-list/group-list.component';
import {AfterViewInit, ViewChild} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(private router: Router, private userService: UserService, private groupService: GroupService, private messageService: MessageService) {
    this.messageService.receiveMessage(this).subscribe();
  }

  username: String = localStorage.getItem('flowUser');
  user;
  searchParam;
  searchResults = [];
  selected = [];
  groupName: String;
  @ViewChild(GroupListComponent)
  private groupListComp: GroupListComponent;

  ngOnInit() {
    $('.dropdown-trigger').dropdown();            // materialize css
    $('.modal').modal();
  // auto login
    if (localStorage.getItem('flowToken') == undefined) {
      this.router.navigate(['login']);            
    }
    let loggedInUser = this.userService.getUserDetails(this.username).toPromise();
    loggedInUser.then(user => {
      this.user = user;
      this.groupListComp.loadComp(user);
    }).catch((e) => {
      console.log(e);
      //alert("Some error");
    });

  }

// go to user profile page
  goToProfile(event) {
    this.router.navigate(['profile',this.user.email]);
  }
// search for users
  search(event) {
    if (this.searchParam.length > 1) {
      let searchCall = this.userService.searchUser(this.searchParam).toPromise();
      searchCall.then(result => this.populateResults(result));
    } else {
      this.searchResults = [];
    }
  }
// update all results to search results
  populateResults(result) {
    this.searchResults = [];
    for (var i = 0; i < result.length; i++) {
      this.searchResults.push({
        name: result[i].name,
        email: result[i].email,
        selected: false
      });
    }
  }
// selecting users for group
  updateSelected(user) {
    if (!this.checkIfPresent(user))
      this.selected.push(user);
  }

  checkIfPresent(user) {
    if (user.email === this.user.email)
      return true;
    for (var i = 0; i < this.selected.length; i++) {
      if (user.email === this.selected[i].email) {
        return true;
      }
    }
    return false;
  }
// logout method
  logout(event) {
    localStorage.removeItem('flowToken');
    localStorage.removeItem('flowUser');
    this.router.navigate(['login']);
  }
// creating a new conversation
  newConversation(event) {
    let members = [];
    members.push(this.user.email);
    members.push(this.selected[0].email);
    let check = this.groupService.checkIfAlreadyExist(members).toPromise();
    check.then((group) => {
      if (group.length == 0) {
        let newGroupCall = this.groupService.createGroup(members, "").toPromise();
        newGroupCall.then(
          ()=> {
            setTimeout(() => {
              let loggedInUser = this.userService.getUserDetails(this.username).toPromise();
              loggedInUser.then(user => {
                this.user = user;
                this.groupListComp.loadComp(user);
              }).catch((e) => {
                console.log(e);
                //alert("Some error");
              });
            }, 1000);
          });
      } else {
        console.log('group already exist');
      }
    });
  }

// removing selected group users
  removeSelected(s) {
    for (var i = 0; i < this.selected.length; i++) {
      if (s.email === this.selected[i].email) {
        this.selected.splice(i, 1);
        return;
      }
    }
  }
// creating a new group
  newGroup(event) {
    let groupMembers = [];
    groupMembers.push(this.user.email);
    for (let i = 0; i < this.selected.length; i++) {
      groupMembers.push(this.selected[i].email);
    }
    let check = this.groupService.checkIfAlreadyExist(groupMembers).toPromise();
    check.then((group) => {
      if (group.length == 0) {
        let newGroupCall = this.groupService.createGroup(groupMembers, this.groupName).toPromise();
        newGroupCall.then(
          ()=> {
            setTimeout(() => {
              let loggedInUser = this.userService.getUserDetails(this.username).toPromise();
              loggedInUser.then(user => {
                this.user = user;
                this.groupListComp.loadComp(user);
              }).catch((e) => {
                console.log(e);
                //alert("Some error");
              });
            }, 1000);
          });
      } else {
        console.log('group already exist');
      }
    });
  }

}
