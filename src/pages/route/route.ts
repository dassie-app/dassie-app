import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Route } from '../../models/route';
import { Wishlist } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage {

  route: Route;
  starArray: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private wishlist: Wishlist
  ) {
    this.route = this.navParams.get('route');
    console.log(this.route);
    if (this.route.stars) {
      for (let i = 0; i < this.route.stars; i++) {
        this.starArray.push(0);
      }
    }
  }

  editRoute() {
    let editModal = this.modalCtrl.create('RouteEditPage');
    editModal.onDidDismiss(route => {
      if(route) {
        alert('add code to edit route');
      }
    });
    editModal.present();
  }

  addToWishlist(){
    this.wishlist.addToWishlist(this.route);
  }

}

