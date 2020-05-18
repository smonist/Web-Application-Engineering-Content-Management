import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Subreddit } from '../models/subreddit';
import { AddSubreddit } from '../models/addSubreddit';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  endpoint = environment.API_ENDPOINT;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getSubreddits(): Observable<Subreddit[]> {
    return this.http
      .get<Subreddit[]>(
        this.endpoint + 'getSubreddits',
        this.auth.getAuthHeader()
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  addSubreddit(sub: AddSubreddit) {
    return this.http
      .post(this.endpoint + 'addSubreddit', sub, this.auth.getAuthHeader())
      .pipe(catchError((err) => this.handleError(err)));
  }

  updateSubreddit(sub: Subreddit) {
    return this.http
      .post(this.endpoint + 'updateSubreddit', sub, this.auth.getAuthHeader())
      .pipe(catchError((err) => this.handleError(err)));
  }

  deleteSub(id: string) {
    const params = new HttpParams().set('id', id);
    return this.http
      .get(this.endpoint + 'deleteSubreddit', {
        params,
        ...this.auth.getAuthHeader(),
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  checkSubredditValid(name: string) {
    const params = new HttpParams().set('subreddit', name);
    return this.http
      .get(this.endpoint + 'subredditValid', {
        params,
        ...this.auth.getAuthHeader(),
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    const status = error.status;
    if (status === 401) {
      this.auth.logout();
    } else {
      return throwError('Something bad happened; please try again later.');
    }
  }
}
