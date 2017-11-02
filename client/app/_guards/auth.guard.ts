import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        if(state.url == "/"){
          this.router.navigate(['/landing'], { skipLocationChange: true });
        }
        else{
          // not logged in so redirect to login page with the return url
          //window.location = "http://www.domain.com/login"
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
        return false;
    }
}
