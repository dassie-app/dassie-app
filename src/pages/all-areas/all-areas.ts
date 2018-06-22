import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Areas } from '../../providers';
import { Area } from '../../models/area';
import { Update } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-all-areas',
  templateUrl: 'all-areas.html',
})
export class AllAreasPage {

  currentAreas: Area[];
  allOffline: boolean;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private areas: Areas,
    private update: Update
  ) {
    this.allOffline = this.update.allOffline;
  }

  ionViewDidLoad() {
    this.areas.getAllAreas().subscribe((response: Area[]) => {
      this.currentAreas = response;
    });
  }

  openArea(area: Area) {
    this.navCtrl.push('AreaPage', {
      area: area
    });
  }

  updateAll() {
    this.update.updateAll();
  }

}
