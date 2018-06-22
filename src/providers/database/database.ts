import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Database {

  constructor(private storage: Storage) {
  }

  saveAreas(areas) {
    return new Promise((resolve, reject) => {
      this.storage.set('areas', areas).then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    })
  }

  saveCrags(crags) {
    return new Promise((resolve, reject) => {
      this.storage.set('crags', crags).then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    })
  }

  saveRoutes(routes) {
    return new Promise((resolve, reject) => {
      this.storage.set('routes', routes).then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    })
  }

  getAreas() {
    return new Promise((resolve, reject) => {
      this.storage.get('areas').then((areas) => {
        resolve(areas);
      }).catch(() => {
        reject();
      });
    })
  }

  getCrags() {
    return new Promise((resolve, reject) => {
      this.storage.get('crags').then((crags) => {
        resolve(crags);
      }).catch(() => {
        reject();
      });
    })
  }

  getRoutes() {
    return new Promise((resolve, reject) => {
      this.storage.get('routes').then((routes) => {
        resolve(routes);
      }).catch(() => {
        reject();
      });
    })
  }

}
