import { AlsterService } from './../alster.service';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { IProjectData } from '../alster.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
declare var $: any;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: IProjectData;
  isEditable = false;
  projectId: number;
  projectLoaded = false;
  deleteInProgress = false;

  @ViewChild('prjName') prjName: ElementRef;

  constructor(private service: AlsterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.projectLoaded = false;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.projectId = +params['id'];
          this.service.getProject(this.projectId).
          subscribe(
            proj => {
              this.project = proj;
              this.projectLoaded = true;
            }
          );
        }
      );
  }

  onEdit() {
    this.isEditable = true;
  }
  onSave() {
     this.isEditable = false;
      this.project.name = this.prjName.nativeElement.value;
      // TODO: Update DB
  }
  onDelete() {
    if (window.confirm('Are you sure you want to delete this project ?')) {
      this.deleteInProgress = true;
      this.service.deleteProject(this.project.projectId).
      subscribe(
      data => {
        this.deleteInProgress = false;
        if (data) {
          this.router.navigate(['../alster/projects']);
        } else {
          alert('Project couldn\'t be deleted!');
        }
      }
        );
     }
  }
  onDiscard() {
    this.isEditable = false;
    this.prjName.nativeElement.value = this.project.name;
  }

  displayModalImage() {
    // here asign the image to the modal when the user click the enlarge link
    $('#imagepreview').attr('src', $('#imageresource').attr('src'));
    $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
 }

 onExport() {
  const dataURI = 'data:image/jpeg;base64,' + this.project.img;
  saveAs(dataURI, this.project.name + '.jpeg');
 }
}
