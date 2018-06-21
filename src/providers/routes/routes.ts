import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../../providers';
import { Route } from '../../models/route';
import { Crag } from '../../models/crag';

@Injectable()
export class Routes {

  constructor(private api: Api) {
  }

  getRoutesByCrag(crag: Crag) {
    return this.api.get(`routes?crag=${crag.id}`);
  }

}
