import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AlertBox } from './../utils/alert-box';

@Injectable()
export class AuthMiddleware implements CanActivate {
    constructor(private router: Router, private alert: AlertBox) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (sessionStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
      }

      //  not logged in so redirect to login page
      this.alert.error('Oops!', 'Please login before redirecting.', 0);
      this.router.navigate(['/login']);
      return false;
    }
  }
