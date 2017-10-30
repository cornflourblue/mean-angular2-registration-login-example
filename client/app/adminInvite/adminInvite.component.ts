import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, Investor, Accelerator } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'adminInvite',
    templateUrl: 'adminInvite.component.html',
    styleUrls: ['adminInvite.component.css']
})

export class AdminInviteComponent{

  //currentUser: User;

  constructor(private userService: UserService){
    //this.currentUser = getCurrentUser();
  }




}
