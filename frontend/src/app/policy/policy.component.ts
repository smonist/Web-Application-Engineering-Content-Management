import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  checked;

  constructor() {
    const temp = localStorage.getItem('cookies');
    if (temp) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  ngOnInit(): void {}

  updatePolicy() {
    if (this.checked) {
      localStorage.removeItem('cookies');
    } else {
      localStorage.setItem('cookies', 'true');
    }
  }
}
