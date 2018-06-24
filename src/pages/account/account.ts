import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Account } from '../../providers';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  currentUser;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private account: Account
  ) {
    this.account.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ionViewDidLoad() {
  }

}
