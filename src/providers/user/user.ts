import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

@Injectable()
export class User {
  _user: any;
  get user() {
    return this._user;
  }

  constructor(private api: Api, private storage: Storage) {
    this.storage.get('user').then(user => {
      this._user = user;
    });
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

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.storage.remove('user');
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(user) {
    this._user = user;
    this.storage.set('user', user);
  }
}
