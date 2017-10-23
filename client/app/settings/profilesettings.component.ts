import { Component, OnInit, Inject } from '@angular/core';
import { User, Accelerator, TeamMember} from '../_models/index';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profilesettings.component.html'
})

export class ProfileSettingsComponent implements OnInit {
    model: any = {};
    loading = false;
    currentUser: any;
    testUser: User;
    users: User[] = [];

    constructor(private userService: UserService,
                private router: Router,
                private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.userService.getById(this.currentUser._id).subscribe(
            currentUser => { this.currentUser = currentUser;});
        this.loadAllUsers();
    }

    update() {        
        this.loading = true;
        this.userService.update(this.currentUser)
            .subscribe(
                data => {
                    this.alertService.success('Profile updated', true);
                    this.loading = false;
                    window.scrollTo(0, 0);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    addTeamMember() {
        if(!this.currentUser.team){
            this.currentUser.team = Array<TeamMember>;
        }
        let tempMember = new TeamMember();
        tempMember.firstName = this.model.input_member_firstname;
        tempMember.lastName = this.model.input_member_lastname;
        tempMember.description = this.model.input_member_description;
        tempMember.linkedInURL = this.model.input_member_linkedInURL;
        this.currentUser.team.push(tempMember);
        this.model.input_member_firstname = this.model.input_member_lastname = 
            this.model.input_member_description = this.model.input_member_linkedInURL = null;
    }

    deleteTeamMember(temp: TeamMember){
        this.currentUser.team = this.currentUser.team.filter(item => item !== temp);
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
