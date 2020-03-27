import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subreddit } from '../models/subreddit';
import { AddSubreddit } from '../models/addSubreddit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  endpoint = environment.API_ENDPOINT;

  constructor() {}

  getSubreddits(): Observable<Subreddit[]> {
    return of([
      {
        id: '1',
        pic:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/768px-Angular_full_color_logo.svg.png',
        name: 'r/angular',
        desc: 'Front page of angular',
        answers: 3,
        added: new Date(),
        active: false
      }
    ]);
  }

  addSubreddit(sub: AddSubreddit) {
    console.log(sub);
  }

  deleteSub(id: string) {
    console.log(id);
  }
}
