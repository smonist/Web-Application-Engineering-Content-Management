import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { DataService } from 'src/app/services/data.service';
import { Subreddit } from 'src/app/models/subreddit';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  subreddits$: Observable<Subreddit[]>;

  faComment = faComment;

  constructor(private data: DataService, private http: HttpService) {
    this.subreddits$ = this.http.getSubreddits();
  }

  ngOnInit(): void {}
}
