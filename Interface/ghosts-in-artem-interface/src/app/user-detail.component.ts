import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  user: User;
  failure_alert: Boolean;
  failure_message: String;
  success_alert: Boolean;
  roles = ["other", "mentor", "depinfo", "ghosts", "master"];
  classes = ["vampire", "peon"];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.failure_alert = false;
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userService.getUser(params.get('id')))
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.updateUser(this.user)
      .then(user => {
        this.success_alert = true;
      })
      .catch(this.displayAlert);
  }

  displayAlert(message: String): void {

  }
}
