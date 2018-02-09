import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  private apiUrl = 'http://192.168.1.206:3000/api';  // URL to web api
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

  getUser(id: String): Promise<User> {
    const url = `${this.apiUrl + this.API_USERS}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    const url = `${this.apiUrl + this.API_USERS}/${user._id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.json().success) {
          return res.json().user as User;
        } else {
          throw new Error(res.json().message);
        }
      })
      .catch(this.handleError);
  }

  createUser(nick_name: string, mac_address : string): Promise<User> {
    return this.http
      .post(this.apiUrl + this.API_USERS, JSON.stringify({name: nick_name, bt_mac: mac_address}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }

  deleteUser(id: String): Promise<void> {
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
