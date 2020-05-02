import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subreddit } from '../models/subreddit';
import { AddSubreddit } from '../models/addSubreddit';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  endpoint = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

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
        active: false,
      },
    ]);
  }

  addSubreddit(sub: AddSubreddit) {
    console.log(sub);
  }

  deleteSub(id: string) {
    console.log(id);
  }

  checkSubredditValid(name: string) {
    const params = new HttpParams().set('subreddit', name);
    return this.http.get(this.endpoint + 'subredditValid', { params });
  }
}
