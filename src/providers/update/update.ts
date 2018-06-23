import { Injectable } from '@angular/core';
import { Api } from '../'
import { Areas } from '../';
import { Crags } from '../';
import { Routes } from '../'
import { OfflineData } from '../../models/events';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Update {

  private _areasOffline = false;
  private _cragsOffline = false;
  private _routesOffline = false;
  private _allOffline = false;
  private _offlineChanges = new Subject<OfflineData>();

  get areasOffline() {
    return this._areasOffline;
  }
  set areasOffline(offline) {
    this._areasOffline = offline;
    this.checkAllOffline();
  }

  get cragsOffline() {
    return this._cragsOffline;
  }
  set cragsOffline(offline) {
    this._cragsOffline = offline;
    this.checkAllOffline();
  }

  get routesOffline() {
    return this._routesOffline;
  }
  set routesOffline(offline) {
    this._routesOffline = offline;
    this.checkAllOffline();
  }

  get allOffline() {
    return this._allOffline;
  }

  constructor(
    private api: Api,
    private storage: Storage,
    private areas: Areas,
    private crags: Crags,
    private routes: Routes
  ) {

    this.storage.get('allOffline').then(offline => {
      this._allOffline = offline;
      this.emitOfflineChanges();
    }).catch(err => {
      // TODO handle this error
    });
  }

  updateAll() {
    this.areasOffline = false;
    this.cragsOffline = false;
    this.routesOffline = false;
    this.api.get('areas').subscribe(areas => {
      this.storage.set('areas', areas).then(() => {
        this.areasOffline = true;
      }).catch(() => {
        // TODO handle error
      });
    });

    this.api.get('crags').subscribe(crags => {
      this.storage.set('crags', crags).then(() => {
        this.cragsOffline = true;
      }).catch(() => {
        // TODO handle error
      });
    });

    this.api.get('routes').subscribe(routes => {
      this.storage.set('routes', routes).then(() => {
        this.routesOffline = true;
      }).catch(() => {
        // TODO handle error
      });
    });

  }

  async checkAllOffline() {
    this._allOffline = this.areasOffline && this.cragsOffline && this.routesOffline;
    this.emitOfflineChanges();
    await this.storage.set('allOffline', this._allOffline);
  }

  offlineChanges() {
    return Observable.create(observer => {
      this._offlineChanges.subscribe(offlineData => {
        observer.next(offlineData);
      });
    });
  }

  emitOfflineChanges() {
    this._offlineChanges.next({
      all: this.allOffline,
      areas: this.areasOffline,
      crags: this.cragsOffline,
      routes: this.routesOffline
    })
  }

}
