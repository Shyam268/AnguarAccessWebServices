import { HttpClient } from '@angular/common/http';
import { IProjectData } from './alster.service';
import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';



export interface IProjectData {
  projectId: number;
  name: string;
  createdDate: Date;
  modifiedDate: Date;
  img: any;
  userId: number;
}
export interface IUserData {
  usedId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  project: any;
}

@Injectable({
  providedIn: 'root'
})

export class AlsterService {
  public loggedIn = false;
  baseUrl = 'https://leicaservicedemo.azurewebsites.net/';
  private projects: IProjectData[] = [];

  public projectChanged = new Subject<number>();
  public loginChanged = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    const myObseravable = Observable.create(
      (obs: Observer<boolean>) => {
        const details = this.http.get<IUserData[]>(this.baseUrl + '/user/details');
        details.subscribe(
          (data) => {
            let found = false;
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              if (element.emailId.toLocaleUpperCase() === email.toLocaleUpperCase()) {
                found = true;
                break;
              }
            }
            obs.next(found);
          },
          (error) => {
            alert('Not able to fetch data');
            obs.next(false);
          });
      }
    );
    this.loggedIn = true;
    this.loginChanged.next(this.loggedIn);
    return myObseravable;
  }
  logout() {
    this.loggedIn = false;
    this.loginChanged.next(false);
    return true;
  }

  getProject(id: number): Observable<IProjectData> {
    return this.http.get<IProjectData>(this.baseUrl + `/project/details/${id}`);
  }

  getProjects(): Observable<IProjectData[]> {
    return this.http.get<IProjectData[]>(this.baseUrl + '/project/details');
  }

  deleteProject(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/project/delete/${id}`);
  }
}
