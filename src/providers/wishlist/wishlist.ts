import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Route } from '../../models/route';

@Injectable()
export class Wishlist {

  constructor(private storage: Storage) {
  }


  addToWishlist(route: Route) {
    this.storage.get('wishlist').then(wishlist => {
      if (wishlist) {
        if(!wishlist.some(id => id == route.id)){
          wishlist.push(route.id);
        }
      } else {
        wishlist = [route.id];
      }

      this.storage.set('wishlist', wishlist);
    });
  }

  removeFromWishlist(route: Route) {

    this.storage.get('wishlist').then(wishlist => {
      if (wishlist) {
        if(wishlist.some(id => id == route.id)){

          var index = wishlist.indexOf(route.id);

          if (index > -1) {
            wishlist.splice(index, 1);
            this.storage.set('wishlist', wishlist);
          }

        }
      } else {
        console.log("Can't find the wishlist");
      }

    });
  }

  getWishlist() {
    return this.storage.get('wishlist')
  }
}
