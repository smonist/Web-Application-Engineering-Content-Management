import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedInSource = new BehaviorSubject<boolean>(false);
  // Loggin status as observbable
  loggedIn$ = this.loggedInSource.asObservable();
  // login status synchronous
  loggedIn = false;

  private profileSource = new BehaviorSubject<Profile>(null);
  profile$ = this.profileSource.asObservable();

  constructor() {
    this.loggedIn$.subscribe(res => (this.loggedIn = res));
  }

  updateLoginStatus(status: boolean) {
    this.loggedInSource.next(status);
  }

  updateProfile(profile: Profile) {
    this.profileSource.next(profile);
  }
}
