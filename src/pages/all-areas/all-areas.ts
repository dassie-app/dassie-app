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
  loading = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private areas: Areas,
    private update: Update
  ) {
    this.update.offlineChanges().subscribe(data => {
      this.allOffline = data.all;
    });
  }

  ionViewDidLoad() {
    this.areas.getAllAreas().then((response: Area[]) => {
      this.currentAreas = response;
    });
  }

  openArea(area: Area) {
    this.navCtrl.push('AreaPage', {
      area: area
    });
  }

  updateAll() {
    this.loading = true;
    this.update.offlineChanges().subscribe(data => {
      if(data.all){
        this.loading = false;
        this.areas.getAllAreas().then((areas: Area[]) => {
          this.currentAreas = areas;
        });
      }
    });
    this.update.updateAll();
  }

}
