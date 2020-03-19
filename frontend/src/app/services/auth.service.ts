import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  endpoint = environment.API_ENDPOINT;

  verifyToken(token: string, nonce: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
        Nonce: nonce
      })
    };

    return this.http.get(this.endpoint + 'login', httpOptions);
  }
}
