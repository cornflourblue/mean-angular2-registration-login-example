import { Component, OnInit } from '@angular/core';

import { User, Investor, Accelerator } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'index.html'
})

export class LandingComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      //  this.loadAllUsers();
      // this.atLanding = false;
    }
    //
    // deleteUser(_id: string) {
    //     this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    // }
    //
    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }
}
