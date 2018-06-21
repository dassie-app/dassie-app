import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Areas } from '../../providers';
import { Area } from '../../models/area';

@IonicPage()
@Component({
  selector: 'page-all-areas',
  templateUrl: 'all-areas.html',
})
export class AllAreasPage {

  currentAreas: Area[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public areas: Areas) {
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

}
