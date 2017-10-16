import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { User, Accelerator } from '../_models/index';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profilesettings.component.html'
})

export class ProfileSettingsComponent implements OnInit {
    model: any = {};
    loading = false;
    currentUser: User;
    testUser: User;
    users: User[] = [];

    constructor(@Inject(DOCUMENT) private document: Document,
                private userService: UserService,
                private router: Router,
                private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.userService.getById(this.currentUser._id).subscribe(currentUser => { this.currentUser = currentUser; console.log(this.currentUser);});
        this.loadAllUsers();
    }

    update() {
        console.log(this.currentUser);
        
        this.loading = true;
        this.userService.update(this.currentUser)
            .subscribe(
                data => {
                    this.alertService.success('Profile updated', true);
                    this.loading = false;
                    this.document.body.scrollTop = 0;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
