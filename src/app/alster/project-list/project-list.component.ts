import { Component, OnInit } from '@angular/core';
import { IProjectData, AlsterService } from '../alster.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectsLoaded = false;

  projects: IProjectData[] = [];
  constructor(private alsterService: AlsterService) { }

  ngOnInit() {
    this.projectsLoaded = false;
    this.alsterService.getProjects().
    subscribe(
      data => {
        this.projects = data;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
        }
        this.projectsLoaded = true;
      }
    );
  }
}
