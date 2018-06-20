import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Area } from '../../models/area';

@Injectable()
export class Areas {

  constructor(private api: Api) {
  }

  getAllAreas() {
    return this.api.get('areas');
  }

}
