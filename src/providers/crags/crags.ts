import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Area } from '../../models/area';

@Injectable()
export class Crags {

  constructor(private api: Api) {
  }

  getCragsByArea(area: Area) {
    return this.api.get(`crags?area=${area.id}`);
  }

}
