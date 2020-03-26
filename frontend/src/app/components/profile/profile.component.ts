import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  token: string;
  url: string;
  name: string;

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(res => {
      this.token = res.split('id_token=')[1];

      const decode = jwt_decode(this.token);
      this.url = decode.picture;
      this.name = decode.name;

      this.auth.verifyToken('Bearer ' + this.token).subscribe(console.log);
    });
  }
}
