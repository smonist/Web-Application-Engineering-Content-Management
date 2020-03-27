import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-subreddit',
  templateUrl: './add-subreddit.component.html',
  styleUrls: ['./add-subreddit.component.scss']
})
export class AddSubredditComponent implements OnInit {
  add = this.fb.group({
    name: [, Validators.required],
    keywords: [, Validators.required],
    answer: [, Validators.required],
    active: [true, Validators.required]
  });

  constructor(private fb: FormBuilder, private http: HttpService) {}

  ngOnInit(): void {}

  onSubmit() {
    const value = this.add.value;
    value.keywords = value.keywords.split(' ');
    this.http.addSubreddit(value);
  }
}
