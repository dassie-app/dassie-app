import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Area } from '../../models/area';
import { Crag } from '../../models/crag';

@Injectable()
export class Crags {

  constructor(private storage: Storage) {
  }

  getCragsByArea(area: Area) {
    return new Promise((resolve, reject) => {
      this.storage.get('crags').then(crags => {
        resolve(crags.filter(crag => crag.area == area.id));
      }).catch(err => {
        // TODO handle error
      });
    });
  }

}
