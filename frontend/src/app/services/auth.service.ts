import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base =
    'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/auth?';
  clientId = 'waecm';
  responseType = 'id_token';
  prompt = 'consent';
  redirectUri = 'http://localhost%3A4200%2Fdashboard';
  scope = 'openid%20profile';
  nonce: string;
  loginUrl: string;

  endpoint = environment.API_ENDPOINT;
  profile: Profile;

  constructor(
    private http: HttpClient,
    private data: DataService,
    private router: Router
  ) {
    this.nonce = uuid();
    this.loginUrl =
      `${this.base}` +
      `client_id=${this.clientId}&` +
      `response_type=${this.responseType}&` +
      `prompt=${this.prompt}&` +
      `redirect_uri=${this.redirectUri}&` +
      `scope=${this.scope}&` +
      `nonce=${this.nonce}`;

    this.data.profile$.subscribe((res) => (this.profile = res));
  }

  verifyToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
        Nonce: this.nonce,
      }),
    };

    return this.http.get(this.endpoint + 'login', httpOptions);
  }

  getAuthHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.profile.sub,
      }),
    };
  }

  logout() {
    this.data.updateLoginStatus(false);
    localStorage.removeItem('token');
    localStorage.removeItem('decode');
    this.router.navigate(['/login']);
  }
}
