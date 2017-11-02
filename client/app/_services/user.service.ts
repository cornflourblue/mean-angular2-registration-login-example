﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {

    currentUser: any;
    // isAdmin = new BehaviorSubject<boolean>(false);

    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/users/' + _id).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/users/register', user);
    }

    update(user: User) {
        return this.http.put('/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete('/users/' + _id);
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    // get isAdmin(): Observable<boolean>{
    //   if(this.currentUser.type == "admin"){
    //     this.isAdmin.next(true);
    //   }
    //
    //   return this.isAdmin.asObservable();
    // }
}
