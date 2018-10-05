import { ErrorPageComponent } from './error-page/error-page.component';
import { ProjectListComponent } from './alster/project-list/project-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './alster/login/login.component';
import { ProjectDetailsComponent } from './alster/project-details/project-details.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/alster',
    pathMatch: 'full'
  },
  {
    path: 'alster',
    component: LoginComponent,
  },
  {
    path: 'alster/projects',
    component: ProjectListComponent,
  },
  {
    path: 'alster/projects/:id',
    component: ProjectDetailsComponent,
  },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
  }
)
export class AppRoutingModule {
}
