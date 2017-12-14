import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NgForm } from'@angular/forms';

import { User } from './user';
import { UserService } from './user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;
  showHide = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onSelect(user: User): void {
      this.selectedUser = user;
  }


  getUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  gotoUser(): void {
    this.router.navigate(['/users', this.selectedUser._id]);
  }



  addUser(f:NgForm): void{
    console.log(f.value);
        this.userService.createUser(f.value.nick_name, f.value.mac_address)
      .then(user => {
    this.userService.getUsers().then(users => this.users = users);
      });

  }

  delete(user: User): void {
    this.userService
      .deleteUser(user._id)
      .then(() => {
        this.users = this.users.filter(u => u !== user);
        if (this.selectedUser === user) { this.selectedUser = null; }
      });
  }
}
