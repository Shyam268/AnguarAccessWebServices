import { AlsterService } from './alster/alster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DemoAngular';
  loggedin: boolean;
  
  constructor(private service: AlsterService) {}

  ngOnInit() {
    this.service.loginChanged.subscribe(
      (login) => {
        this.loggedin = login;
      });
  }
}
