import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'userManagement',
    templateUrl: 'userManagement.component.html',
    //stylesUrl: ['userManagement.component.css']
})

export class UserManagementComponent{

  currentUser: any;
  users: User[] = [];

  constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadAllUsers();
      //currentUser.isAdmin();

      console.log(this.currentUser.contactTitle)
  }

  deleteUser(_id: string) {
      this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
      console.log("user deleted");

  }

  private loadAllUsers() {
      this.userService.getAll().subscribe(users => { this.users = users; });

  }




}
