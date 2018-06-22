import { Injectable } from '@angular/core';
import { Api } from '../'
import { Areas } from '../';
import { Crags } from '../';
import { Routes } from '../'
import { Storage } from '@ionic/storage';
import { Database } from '../';

@Injectable()
export class Update {

  private _areasOffline = false;
  private _cragsOffline = false;
  private _routesOffline = false;

  get areasOffline() {
    return this.areasOffline;
  }

  get cragsOffline() {
    return this.areasOffline;
  }

  get routesOffline() {
    return this.areasOffline;
  }

  constructor(
    private api: Api,
    private storage: Storage,
    private areas: Areas,
    private crags: Crags,
    private routes: Routes
  ) {
  }

  updateAll() {
    this._areasOffline = false;
    this._cragsOffline = false;
    this._routesOffline = false;
    this.api.get('areas').subscribe(areas => {
      this.storage.set('areas', areas).then(() => {
        this._areasOffline = false;
      }).catch(() => {
        // TODO handle error
      });
    });

    this.api.get('crags').subscribe(crags => {
      this.storage.set('crags', crags).then(() => {
        this._cragsOffline = true;
      }).catch(() => {
        // TODO handle error
      });
    });

    this.api.get('routes').subscribe(routes => {
      this.storage.set('routes', routes).then(() => {
        this._routesOffline = true;
      }).catch(() => {
        // TODO handle error
      });
    });

  }

}
