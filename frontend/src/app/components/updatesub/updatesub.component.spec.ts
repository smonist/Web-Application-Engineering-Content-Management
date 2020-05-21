import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { UpdatesubComponent } from './updatesub.component';
import {By} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';


// describe('UpdatesubComponent', () => {
//   let component: UpdatesubComponent;
//   let fixture: ComponentFixture<UpdatesubComponent>;
//   let updateBtn: HTMLButtonElement;
//   let userAddSub: HTMLInputElement;
//   let userPassword: HTMLInputElement;
//   let userAnswer: HTMLInputElement;

//   let location: Location;
//   let router: Router;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ UpdatesubComponent ],
//       imports: [ FormsModule,
//         RouterTestingModule.withRoutes(
//           [{path: 'update', component: UpdatesubComponent}, ])
//       ],
//     })
//       .compileComponents();
//   }));

//   router = TestBed.get(Router);
//   location = TestBed.get(Location);


//   beforeEach(() => {

//     userAddSub = fixture.debugElement.query(By.css('.name')).nativeElement;
//     userPassword = fixture.debugElement.query(By.css('.keywords')).nativeElement;
//     userAnswer = fixture.debugElement.query(By.css('.answer')).nativeElement;
//     updateBtn = fixture.debugElement.query(By.css('.updateButton')).nativeElement;
//     fixture = TestBed.createComponent(UpdatesubComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should check update button is disabled initially', () => {
//     fixture.detectChanges();
//     updateBtn =   fixture.debugElement.query(By.css('.updateButton')).nativeElement;
//     fixture.whenStable().then(() => {
//       expect(updateBtn.disabled).toBe(true)
//     })
//   });

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
//   it('should check update button is enabled after inputs check out', async(() => {
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       userAddSub.value = '';
//       userAddSub.dispatchEvent(new Event('input'));

//       userPassword.value = 'asdf asdf asdf';
//       userPassword.dispatchEvent(new Event('input'));

//       userAnswer.value = 'This is my answer';
//       userAnswer.dispatchEvent(new Event('input'));
//       let firstNameValidationError: DebugElement;

//       fixture.detectChanges(); // run change detection
//       firstNameValidationError = fixture.debugElement.query(By.css('.error'));
//       expect(updateBtn.disabled).toBe(false);
//       expect(firstNameValidationError).toBeTruthy();
//     });
//   }));
//   });
