import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(/* route: ActivatedRouteSnapshot, state: RouterStateSnapshot */): any {
    return this.tokenService.getToken() && !this.tokenService.isTokenExpired();
  }
}
