import { Component, OnInit, Input } from '@angular/core';
import { IProjectData, AlsterService } from '../alster.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-thumbnail-view',
  templateUrl: './project-thumbnail-view.component.html',
  styleUrls: ['./project-thumbnail-view.component.css']
})
export class ProjectThumbnailViewComponent implements OnInit {

  @Input() project: IProjectData;

  constructor(private alsterService: AlsterService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
  }
  onClick() {
    this.router.navigate(['../projects/' +  this.project.projectId], { relativeTo: this.route });
  }
}
