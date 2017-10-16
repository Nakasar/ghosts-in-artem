import { Component } from '@angular/core';
export class User {
    id: number;
    name: String;
}

const USERS: User[] = [
    { id: 11, name: 'Dupont' },
    { id: 12, name: 'Jean' },
    { id: 13, name: 'Nakasar' },
    { id: 14, name: 'Marcel' },
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ghosts In Artem Interface';
  users = USERS;
  selectedUser: User;

  onSelect(user: User): void {
      this.selectedUser = user;
  }
}
