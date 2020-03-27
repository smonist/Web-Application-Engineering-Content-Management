import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;

  loggedIn$: Observable<boolean>;
  profile$: Observable<Profile>;

  constructor(private data: DataService, private auth: AuthService) {
    this.loggedIn$ = this.data.loggedIn$;
    this.profile$ = this.data.profile$;
  }

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }
}
