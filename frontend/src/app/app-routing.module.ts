import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { AddSubredditComponent } from './components/add-subreddit/add-subreddit.component';
import { UpdatesubComponent } from './components/updatesub/updatesub.component';
import { PolicyComponent } from './policy/policy.component';
import { LoggedInComponent } from './logged-in/logged-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: '',
    component: LoggedInComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'add',
        component: AddSubredditComponent,
      },
      {
        path: 'update',
        component: UpdatesubComponent,
      },
    ],
    canActivateChild: [LoginGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
