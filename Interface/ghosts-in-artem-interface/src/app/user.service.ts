import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  private apiUrl = 'api';  // URL to web api
  private API_USERS = '/users';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http
  ) { }

  getUsers(): Promise<User[]> {
    return this.http.get(this.apiUrl + this.API_USERS)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    const url = `${this.apiUrl + this.API_USERS}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    const url = `${this.apiUrl + this.API_USERS}/${user.id}`;
    return this.http
    .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  createUser(nick_name: string): Promise<User> {
    return this.http
      .post(this.apiUrl + this.API_USERS, JSON.stringify({nick_name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }

  deleteUser(id: number): Promise<void> {
    const url = `${this.apiUrl + this.API_USERS}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured with users api:', error); // NOT FOR PRODUCTION !
    return Promise.reject(error.message || error);
  }
}
