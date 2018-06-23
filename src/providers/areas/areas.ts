import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Area } from '../../models/area';

@Injectable()
export class Areas {

  constructor(private storage: Storage) {
  }

  getAllAreas() {
    return new Promise((resolve, reject) => {
      this.storage.get('areas').then(areas => {
        resolve(areas);
      }).catch(err => {
        // TODO handle error
      });
    });
  }

}
