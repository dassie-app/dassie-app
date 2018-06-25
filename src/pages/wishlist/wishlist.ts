import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Wishlist, Routes } from '../../providers';
import { Route } from '../../models/route';

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  currentRoutes: Route[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wishlist: Wishlist,
    private routes: Routes
  ) {
    this.wishlist.getWishlist().then(wishlist => {
      this.routes.getRoutesByIds(wishlist).then(routes => {
        this.currentRoutes = routes;
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }

  openRoute(route: Route) {
    this.navCtrl.push('RoutePage', { route });
  }

  //The remove method calls the provider method to remove the selected Id from the Wishlist local storage array
  removeRoute(route) {
    this.wishlist.removeFromWishlist(route);
  }

}
