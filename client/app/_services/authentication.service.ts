import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User, Investor, Accelerator } from '../_models/index';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: Http) {
        this.loggedIn.next(!!localStorage.getItem('currentUser'));
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post('/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log(user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.loggedIn.next(true);
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        console.log('logout called');
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
    }
}