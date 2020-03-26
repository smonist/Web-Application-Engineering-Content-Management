import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  nonce: string;

  constructor(private http: HttpClient) {
    this.nonce = uuid();
  }

  endpoint = environment.API_ENDPOINT;


  verifyToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
        Nonce: this.nonce
      })
    };

    return this.http.get(this.endpoint + 'login', httpOptions);
  }
}
