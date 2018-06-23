import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Routes } from '../../providers';
import { Crag } from '../../models/crag';
import { Route } from '../../models/route';

@IonicPage()
@Component({
  selector: 'page-crag',
  templateUrl: 'crag.html',
})
export class CragPage {

  crag: Crag;
  currentRoutes: Route[];
  segment: string = 'routes';

  constructor(public navCtrl: NavController, public navParams: NavParams, private routes: Routes) {
    this.crag = this.navParams.get('crag');
  }

  ionViewDidLoad() {
    this.routes.getRoutesByCrag(this.crag).then((routes: Route[]) => {
      this.currentRoutes = routes;
    });
  }

  openRoute(route: Route) {
    this.navCtrl.push('RoutePage', { route });
  }

}
