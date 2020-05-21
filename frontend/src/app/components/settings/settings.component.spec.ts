import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {Router, RouterModule} from '@angular/router';
import {fakeAsync, tick} from '@angular/core/testing';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';


// describe('SettingsComponent', () => {
//   let component: SettingsComponent;
//   let fixture: ComponentFixture<SettingsComponent>;
//   let location: Location;
//   let router: Router;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SettingsComponent ],
//       imports:  [RouterTestingModule, HttpClient]
//     })
//     .compileComponents();

//     router = TestBed.get(Router);
//     location = TestBed.get(Location);

//     fixture = TestBed.createComponent(SettingsComponent);
//     router.initialNavigation();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SettingsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
