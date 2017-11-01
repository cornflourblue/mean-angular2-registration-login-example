import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, Accelerator, TeamMember} from '../_models/index';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    users: User[] = [];

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    addTeamMember() {
        if(!this.model.team){
            this.model.team =  Array<TeamMember>();
        }
        let tempMember = new TeamMember();
        tempMember.firstName = this.model.input_member_firstname;
        tempMember.lastName = this.model.input_member_lastname;
        tempMember.description = this.model.input_member_description;
        tempMember.linkedInURL = this.model.input_member_linkedInURL;
        this.model.team.push(tempMember);
        this.model.input_member_firstname = this.model.input_member_lastname =
            this.model.input_member_description = this.model.input_member_linkedInURL = null;
    }

    deleteTeamMember(temp: TeamMember){
        this.model.team = this.model.team.filter((item: TeamMember) => item !== temp);
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
