import { AlsterService } from './alster.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectThumbnailViewComponent } from './project-thumbnail-view/project-thumbnail-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [AlsterService],
  declarations: [
    LoginComponent,
    ProjectDetailsComponent,
    ProjectListComponent,
    ProjectThumbnailViewComponent
  ]
})
export class AlsterModule { }
