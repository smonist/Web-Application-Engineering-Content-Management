import { Component, OnInit } from '@angular/core';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Subreddit } from 'src/app/models/subreddit';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  subreddits$: Observable<Subreddit[]>;

  faPlus = faPlus;
  faTimesCircle = faTimesCircle;

  constructor(private http: HttpService) {
    this.subreddits$ = this.http.getSubreddits();
  }

  ngOnInit(): void {}

  deleteSub(id: string){
    this.http.deleteSub(id);
  }
}
