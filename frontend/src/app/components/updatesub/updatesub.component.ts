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
import { DataService } from 'src/app/services/data.service';
import { Subreddit } from 'src/app/models/subreddit';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatesub',
  templateUrl: './updatesub.component.html',
  styleUrls: ['./updatesub.component.scss'],
})
export class UpdatesubComponent implements OnInit {
  update = this.fb.group({
    name: [,],
    keywords: [, Validators.required],
    answer: [, Validators.required],
    active: [true, Validators.required],
  });

  faCircleNotch = faCircleNotch;
  faCheck = faCheck;
  faTimes = faTimes;

  subreddit: Subreddit;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.data.subreddit$.subscribe((res) => {
      this.subreddit = res;
      this.update.get('name').setValue(res.name);
      this.update.get('keywords').setValue(res.keywords.join(' '));
      this.update.get('answer').setValue(res.answer);
      this.update.get('active').setValue(res.active);
    });

    if (!this.subreddit) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    const value = this.update.value;
    value.keywords = value.keywords.split(' ');
    this.subreddit.keywords = value.keywords;
    this.subreddit.answer = value.answer;
    this.subreddit.active = value.active;

    console.log(this.subreddit);

    this.http
      .updateSubreddit(this.subreddit)
      .subscribe((res) => this.toast.success('subreddit updated'));
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
