import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Crags } from '../../providers';
import { Area } from '../../models/area';
import { Crag } from '../../models/crag';

@IonicPage()
@Component({
  selector: 'page-area',
  templateUrl: 'area.html',
})
export class AreaPage {

  area: Area;
  currentCrags: Crag[];
  segment: string = 'crags';

  constructor(public navCtrl: NavController, public navParams: NavParams, private crags: Crags) {
    this.area = this.navParams.get('area');
  }

  ionViewDidLoad() {
    this.crags.getCragsByArea(this.area).then((crags: Crag[]) => {
      this.currentCrags = crags;
    });
  }

  openCrag(crag) {
    this.navCtrl.push('CragPage', { crag });
  }

}
