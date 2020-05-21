import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpService } from 'src/app/services/http.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockHttpService: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      declarations: [DashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockHttpService = TestBed.inject(HttpService);
    mockHttpService.getSubreddits = jasmine.createSpy().and.returnValue(
      of([
        {
          id: '1',
          pic: '1',
          name: '1',
          description: 'str1ing',
          answers: 1,
          answer: '1',
          keywords: ['1'],
          added: new Date(),
          active: false,
        },
        {
          id: '2',
          pic: '2',
          name: '2',
          description: '2',
          answers: 2,
          answer: '2',
          keywords: ['2'],
          added: new Date(),
          active: true,
        },
      ])
    );

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`subreddit should only be shown when active`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.sub').length).toBe(1);
  });

  it(`subreddit name should be displayed`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.sub a').textContent.trim()).toBe('2');
  });

  it(`subreddit img schould have correct src`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.sub img').getAttribute('src').trim()).toBe(
      '2'
    );
  });

  it(`subreddit should dispaly correct number of answers`, () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.answers.flex span').textContent.trim()
    ).toBe('2');
  });
});
