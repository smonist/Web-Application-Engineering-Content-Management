import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;

  loggedIn$: Observable<boolean>;
  profile$: Observable<Profile>;

  closeResult = '';

  constructor(
    private data: DataService,
    private auth: AuthService,
    private modalService: NgbModal
  ) {
    this.loggedIn$ = this.data.loggedIn$;
    this.profile$ = this.data.profile$;
  }

  ngOnInit(): void {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          if (result) {
            this.auth.logout();
          }
        },
        reason => {}
      );
  }
}
