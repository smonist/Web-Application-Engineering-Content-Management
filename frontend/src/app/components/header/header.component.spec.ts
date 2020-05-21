import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../header/header.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      declarations: [HeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render correct title`, () => {
    component.loggedIn$ = of(true);
    component.profile$ = of({
      sub: 'sub',
      pic: 'pic',
      name: 'name',
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#username').textContent).toContain(
      'Hello, name'
    );
  });

  it(`should render nav only when logged in`, () => {
    component.loggedIn$ = of(false);
    component.profile$ = of({
      sub: 'sub',
      pic: 'pic',
      name: 'name',
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('nav')).toBeNull();

    component.loggedIn$ = of(true);
    fixture.detectChanges();
    expect(compiled.querySelector('nav')).toBeTruthy();
  });

  it(`should open modal`, () => {
    spy = spyOn(component, 'open');
    component.loggedIn$ = of(true);
    component.profile$ = of({
      sub: 'sub',
      pic: 'pic',
      name: 'name',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('fa-icon');
    button.click();

    expect(spy).toHaveBeenCalled();
  });
});
