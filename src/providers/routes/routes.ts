import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Route } from '../../models/route';
import { Crag } from '../../models/crag';

@Injectable()
export class Routes {

  constructor(private storage: Storage) {
  }

  getRoutesByCrag(crag: Crag) {
    return new Promise((resolve, reject) => {
      this.storage.get('routes').then(routes => {
        resolve(routes.filter(route => route.crag == crag.id));
      }).catch(err => {
        // TODO handle error
      });
    });
  }

}
