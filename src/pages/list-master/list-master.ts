import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Areas } from '../../providers';
import { Area } from '../../models/area';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentAreas: Area[];

  constructor(public navCtrl: NavController, public areas: Areas, public modalCtrl: ModalController) {
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Navigate to the detail page for this item.
   */
  openArea(area: Area) {
    this.navCtrl.push('ItemDetailPage', {
      area: area
    });
  }
}
