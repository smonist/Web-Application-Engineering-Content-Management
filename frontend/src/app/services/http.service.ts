import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subreddit } from '../models/subreddit';
import { AddSubreddit } from '../models/addSubreddit';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  endpoint = environment.API_ENDPOINT;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getSubreddits(): Observable<Subreddit[]> {
    return this.http.get<Subreddit[]>(
      this.endpoint + 'getSubreddits',
      this.auth.getAuthHeader()
    );
  }

  addSubreddit(sub: AddSubreddit) {
    return this.http.post(
      this.endpoint + 'addSubreddit',
      sub,
      this.auth.getAuthHeader()
    );
  }

  updateSubreddit(sub: Subreddit) {
    return this.http.post(
      this.endpoint + 'updateSubreddit',
      sub,
      this.auth.getAuthHeader()
    );
  }

  deleteSub(id: string) {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.endpoint + 'deleteSubreddit', {
      params,
      ...this.auth.getAuthHeader(),
    });
  }

  checkSubredditValid(name: string) {
    const params = new HttpParams().set('subreddit', name);
    return this.http.get(this.endpoint + 'subredditValid', {
      params,
      ...this.auth.getAuthHeader(),
    });
  }
}
