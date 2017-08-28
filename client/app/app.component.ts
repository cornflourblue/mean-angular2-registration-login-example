import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/index';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent { 

	loggedIn : any;

	constructor(private auth: AuthenticationService) { }

    ngOnInit() {
        this.auth.isLoggedIn
            .subscribe(res => this.loggedIn = res);
    }
}