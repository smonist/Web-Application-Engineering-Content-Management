import { Component, OnInit } from '@angular/core';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Subreddit } from 'src/app/models/subreddit';
import { HttpService } from 'src/app/services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  subreddits: Subreddit[];

  faPlus = faPlus;
  faTimesCircle = faTimesCircle;

  constructor(
    private http: HttpService,
    private modalService: NgbModal,
    private router: Router,
    private data: DataService,
    private toast: ToastrService
  ) {
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
              this.toast.success('subreddit deleted');
              const index = this.subreddits.findIndex((e) => e.id === id);
              this.subreddits.splice(index, 1);
            });
          }
        },
        (reason) => {}
      );
  }

  update(sub: Subreddit) {
    console.log(sub);
    this.data.updateSubreddit(sub);

    this.router.navigate(['update']);
  }
}
