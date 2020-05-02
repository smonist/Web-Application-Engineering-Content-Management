import { Component, OnInit } from '@angular/core';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Subreddit } from 'src/app/models/subreddit';
import { HttpService } from 'src/app/services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  subreddits: Subreddit[];

  faPlus = faPlus;
  faTimesCircle = faTimesCircle;

  constructor(private http: HttpService, private modalService: NgbModal) {
    this.http.getSubreddits().subscribe((res) => (this.subreddits = res));
  }

  ngOnInit(): void {}

  deleteSub(id: string, modal) {
    this.modalService
      .open(modal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (result) {
            this.http.deleteSub(id).subscribe((res) => {
              const index = this.subreddits.findIndex((e) => e.id === id);
              this.subreddits.splice(index, 1);
            });
          }
        },
        (reason) => {}
      );
  }
}
