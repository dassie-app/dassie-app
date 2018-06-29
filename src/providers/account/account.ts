import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders  } from '@angular/common/http';

@Injectable()
export class Account {
  API_ROOT = 'http://localhost:8000/';
  userChange = new Subject<User>();
  _user: any;
  token: string;
  get user() {
    return this._user;
  }

  constructor(private api: Api, private storage: Storage, private http: HttpClient) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.API_ROOT + 'authenticate/', accountInfo).subscribe(response => {
        let token = response['token'];
        console.log('token: ', token);
        this.token = token;
        this.retrieveUserProfile();
        resolve();
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

  retrieveUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.token}`
      })
    }
    this.http.get(this.API_ROOT + 'api/profile/', httpOptions ).subscribe(profile => {
      console.log('profile', profile)
      this.storage.set('profile', profile);
    });
  }

  getProfile() {
    return Observable.create((observer: Observer<User>) => {
      this.storage.get('profile').then(profile => {
        observer.next(profile);
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
