import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { User } from '../../models/user';

@Injectable()
export class Account {
  userChange = new Subject<User>();
  _user: any;
  get user() {
    return this._user;
  }

  constructor(private api: Api, private storage: Storage) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let query = `users?email=${accountInfo.email}&password=${accountInfo.password}`;
    return new Promise((resolve, reject) => {
      this.api.get(query).subscribe((result: any[]) => {
        if(result.length) {
          this._loggedIn(result[0])
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let query = `users?email=${accountInfo.email}&password=${accountInfo.password}`;
    return new Promise((resolve, reject) => {
      this.api.post('users', accountInfo).subscribe((user) => {
        if(user) {
          this._loggedIn(user);
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  getUser() {
    return Observable.create((observer: Observer<User>) => {
      this.storage.get('user').then(user => {
        observer.next(user);
      });
      this.userChange.subscribe(user => {
        observer.next(user);
      });
    });
  }

  saveUser(user) {
    console.log('saving user: ', user);
    this._user = user;
    this.storage.set('user', user);
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.storage.remove('user');
    this.userChange.next(null);
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(user) {
    this._user = user;
    this.storage.set('user', user);
    this.userChange.next(user);
  }
}
