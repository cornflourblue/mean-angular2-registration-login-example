import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Accelerator } from '../_models/index';
import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'accelerator.component.html'
})

export class RegisterAcceleratorComponent {
    model: any = {};
    loading = false;
    user : Accelerator;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.user = new Accelerator(this.model.username, this.model.password);
        console.log(this.user);
        console.log(this.model);
        this.userService.create(this.user)
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
}
