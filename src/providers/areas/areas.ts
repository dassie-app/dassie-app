import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Area } from '../../models/area';

@Injectable()
export class Areas {

  constructor(private storage: Storage) {
  }

  getAllAreas() {
    return this.storage.get('areas');
  }

}
