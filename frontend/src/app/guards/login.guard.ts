import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import * as jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  token;
  decode;
  errorRedirect = this.router.parseUrl('/login');

  constructor(
    private data: DataService,
    private router: Router,
    private auth: AuthService
  ) {
    this.token = sessionStorage.getItem('token');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Parse token and save in local storage
    if (next.fragment) {
      try {
        this.token = next.fragment.split('id_token=')[1];
        sessionStorage.setItem('token', this.token);
        console.log(this.token);

        this.parseProfile();
      } catch (e) {
        console.log('error parsing token');
        this.data.updateLoginStatus(false);
        return this.errorRedirect;
      }
    } else if (this.data.loggedIn) {
      this.data.updateLoginStatus(true);
      return true;
    }

    if (this.token) {
      this.parseProfile();

      // verify token with backend if token is in local storage
      return this.auth.verifyToken('Bearer ' + this.token).pipe(
        map((res) => !!res),
        catchError((err) => of(this.errorRedirect)),
        tap((res) => {
          if (res === true) {
            this.data.updateLoginStatus(true);
          }
        })
      );
    } else {
      return this.errorRedirect;
    }
  }

  parseProfile() {
    this.decode = jwt_decode(this.token);
    sessionStorage.setItem('decode', JSON.stringify(this.decode));

    this.data.updateProfile({
      sub: this.decode.sub,
      name: this.decode.name,
      pic: this.decode.picture,
    });
  }
}
