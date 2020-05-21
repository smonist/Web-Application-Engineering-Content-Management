import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss'],
})
export class LoggedInComponent  implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    document.getElementById('cookies').addEventListener('on-accept', () => {
      localStorage.setItem('cookies', 'true');
    });
  }
}
