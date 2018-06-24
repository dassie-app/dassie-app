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
}
