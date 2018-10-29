import { Component, OnInit, group } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { GroupService } from './../services/group-service';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  @Input() user;
  @Input() chatbox;
  loggedInUser;

  constructor(private groupService:GroupService) { }
  groupsArr = [];
  selectedgroup;
  show;

  ngOnInit() {

  }
// load this component with passed user
  loadComp(user){
    //this.loggedInUser = user;
    if(user.groups.length != 0) this.show = true;
    this.groupsArr = [];
    for(let i=0; i<user.groups.length; i++){
      let groupCall = this.groupService.getGroup(user.groups[i]).toPromise();
      groupCall.then(group => {
        this.processGroup(group);
        if (this.selectedgroup != undefined) {
          this.loadMessages(this.selectedgroup);
       }
      });
    }
  }
// processing the groups data for front end
  processGroup(group){
    console.log(group);
    if(group.name == undefined || group.name == ''){
      if(group.members[0]===this.user.email){
        this.groupsArr.push({
          groupid:group._id,
          groupname:group.members[1]
        })
      }else
      this.groupsArr.push({
        groupid:group._id,
        groupname:group.members[0]
      })
    }else{
      this.groupsArr.push({
        groupid:group._id,
        groupname:group.name
      })
    }
  }
// loading a conversation
  loadMessages(group){
    this.selectedgroup=group;
    this.chatbox.loadMessages(group, this.user);
  }
}
