import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { AddSubredditComponent } from './add-subreddit.component';
import {LoginComponent} from '../login/login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Router, RouterModule} from '@angular/router';
import {Location} from '@angular/common';

// describe('AddSubredditComponent', () => {
//   let component: AddSubredditComponent;
//   let fixture: ComponentFixture<AddSubredditComponent>;
//   let userAddSub: HTMLInputElement;
//   let userPassword: HTMLInputElement;
//   let userAnswer: HTMLInputElement;
//   let saveBtn: HTMLButtonElement;

//   let location: Location;
//   let router: Router;

//   beforeEach(async(() => {

//     TestBed.configureTestingModule({
//       declarations: [ AddSubredditComponent ],
//       imports: [ FormsModule,
//         RouterTestingModule.withRoutes(
//           [{path: 'add', component: AddSubredditComponent}, ])
//       ],
//     })
//     .compileComponents();
//   }));

//   router = TestBed.get(Router);
//   location = TestBed.get(Location);

//   beforeEach(() => {
//     userAddSub = fixture.debugElement.query(By.css('.name')).nativeElement;
//     userPassword = fixture.debugElement.query(By.css('.keywords')).nativeElement;
//     userAnswer = fixture.debugElement.query(By.css('.answer')).nativeElement;
//     console.log(userPassword);
//     saveBtn = fixture.debugElement.query(By.css('.saveButton')).nativeElement;
//     fixture = TestBed.createComponent(AddSubredditComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should check save button is disabled initially', () => {
//     fixture.detectChanges();
//     saveBtn =   fixture.debugElement.query(By.css('.saveButton')).nativeElement;
//     fixture.whenStable().then(() => {
//       expect(saveBtn.disabled).toBe(true)
//     })
//   });

//   it('should check save button is enabled after inputs check out', async(() => {
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       userAddSub.value = 'node.js';
//       userAddSub.dispatchEvent(new Event('input'));

//       userPassword.value = 'asdf asdf asdf';
//       userPassword.dispatchEvent(new Event('input'));

//       userAnswer.value = 'This is my answer';
//       userAnswer.dispatchEvent(new Event('input'));
//       fixture.detectChanges();
//       expect(saveBtn.disabled).toBe(false);
//     });
//   }));

//   it('should check save button is enabled after inputs check out', async(() => {
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       userAddSub.value = 'node.js';
//       userAddSub.dispatchEvent(new Event('input'));

//       userPassword.value = 'withoutspaces';
//       userPassword.dispatchEvent(new Event('input'));

//       userAnswer.value = 'This is my answer, 2.';
//       userAnswer.dispatchEvent(new Event('input'));
//       fixture.detectChanges();
//       expect(saveBtn.disabled).toBe(true);
//     });
//   }));

//   it('should', async(() => {
//     spyOn(component, 'onSubmit');

//     const button = fixture.debugElement.nativeElement.querySelector('button');
//     button.click();

//     fixture.whenStable().then(() => {
//       expect(component.onSubmit).toHaveBeenCalled();

//       router.navigate(['dashboard']);
//       tick();
//       expect(location.path()).toBe('/dashboard');
//     });
//   }));






// });
