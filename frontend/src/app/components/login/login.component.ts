import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loggedIn = false;
  url: string;
  idToken: string;
  accesToken: string;
  nonce: void;
  constructor(private auth: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    if (window.localStorage.getItem('login') === 'user logged in') {
      this.router.navigate(['/home']);
    }
    // this.onLogin = this.onLogin.bind(this);
    // tslint:disable-next-line:prefer-const
    this.idToken = this.extractIdToken();
    console.log('id_token ' +  this.idToken);
    if ( this.idToken) {
      const options: RequestInit = {
        method: 'GET',
        headers: new Headers({'Authorization ' : 'Bearer ' +  this.idToken}),
        mode: 'no-cors'
      };
      fetch('localhost:4200/api/login', options).then(
        (response) => {
          console.log('fetch link');
          if (response.status === 200) {
            window.localStorage.setItem('login', 'user logged in');
            window.localStorage.setItem('id_token',  this.idToken);
            this.router.navigate(['/home']);
          }
        }
      );

    }
  }

  onLogin() {
    this.loggedIn = true;
    // tslint:disable-next-line:max-line-length
    const url = 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/auth?client_id=waecm&response_type=id_token&prompt=consent&redirect_uri=http://localhost%3A4200%2Fprofile&scope=openid%20profile&nonce=12345';
    const nonce = this.getRandomStringURL(16);
    window.location.href = url + nonce;
  }

  extractName(name: string) {
    // tslint:disable-next-line:prefer-const
    let match = RegExp('[#&]' + name  + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ''));
  }

  extractAccessToken() {
    return this.extractName('access_token');
  }

  extractIdToken() {
    return this.extractName('id_token');
  }

  getRandomStringURL(length: number) {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._';
    let result = '';
    while (length  > 0) {
      const bytes = new Uint8Array(16);
      const random = window.crypto.getRandomValues(bytes);

      // tslint:disable-next-line:only-arrow-functions
      random.forEach(function(c) {
        if ( length === 0) {
          return;
        }
        if (c < charset.length) {
          result += charset[c];
          length--;
        }
      });
    }
  }
}
