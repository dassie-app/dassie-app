import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Route } from '../../models/route';

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage {

  route: Route;
  starArray: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.route = this.navParams.get('route');
    for (let i = 0; i < this.route.stars; i++) {
      this.starArray.push(0);
    }
  }

}
