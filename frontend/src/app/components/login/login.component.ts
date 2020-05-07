import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    window.location.href = this.auth.loginUrl;
  }
}
