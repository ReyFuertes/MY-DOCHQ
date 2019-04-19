import { Injectable } from '@angular/core';
import { Environment } from '../../environments/environment';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from './local-storage.service';
import { MessageService } from './message.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private message: MessageService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.getString('obj')) {
      this.message.add('AuthGuard: User Authenticated');
      // logged in so return true
      return true;
    }
    this.message.add('AuthGuard: User Not Authenticated');

    // not logged in so redirect to login page with the return url
    this.router.navigate([ Environment.authFailRedirect ], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
