import { AlsterService } from './../alster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tryParse } from 'selenium-webdriver/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  loginInProgress = false;
  invalidUser = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: AlsterService) { }

  ngOnInit() {
  }
  onSubmit() {
  this.invalidUser = false;
  this.loginInProgress = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.username;
    this.service.login(username, password).subscribe(
      (success: boolean) => {
        this.loginInProgress = false;
        this.invalidUser = !success;
        if (success) {
          this.router.navigate(['../alster/projects'], { relativeTo: this.route });
        }
      });
  }
}
