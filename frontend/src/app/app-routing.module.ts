import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { AddSubredditComponent } from './components/add-subreddit/add-subreddit.component';
import { UpdatesubComponent } from './components/updatesub/updatesub.component';

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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'add',
    component: AddSubredditComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'update',
    component: UpdatesubComponent,
    canActivate: [LoginGuard],
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
