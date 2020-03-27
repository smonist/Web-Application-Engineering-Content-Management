import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubredditComponent } from './add-subreddit.component';

describe('AddSubredditComponent', () => {
  let component: AddSubredditComponent;
  let fixture: ComponentFixture<AddSubredditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubredditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubredditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
