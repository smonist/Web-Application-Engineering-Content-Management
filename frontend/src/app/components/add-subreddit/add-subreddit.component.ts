import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AsyncValidatorFn } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  first,
} from 'rxjs/operators';
import {
  faCircleNotch,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subreddit',
  templateUrl: './add-subreddit.component.html',
  styleUrls: ['./add-subreddit.component.scss'],
})
export class AddSubredditComponent implements OnInit {
  add = this.fb.group({
    name: [, [Validators.required], [this.validateSubreddit()]],
    keywords: [, Validators.required],
    answer: [, Validators.required],
    active: [true, Validators.required],
  });

  faCircleNotch = faCircleNotch;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const value = this.add.value;
    value.keywords = value.keywords.split(' ');
    this.http
      .addSubreddit(value)
      .subscribe((res) => this.router.navigate(['/dashboard']));
  }

  validateSubreddit(): AsyncValidatorFn {
    return (control) =>
      control.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value: string) => this.http.checkSubredditValid(value)),
        map((success) => {
          return success ? null : { subredditValid: true };
        }),
        first()
      );
  }
}
