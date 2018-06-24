import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
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
    private account: Account,
    private modalCtrl: ModalController
  ) {
    this.account.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ionViewDidLoad() {
  }

  editAccount() {
    let editModal = this.modalCtrl.create('AccountEditPage', { user: this.currentUser });
    editModal.onDidDismiss(user => {
      if(user) {
        this.account.saveUser(user);
      }
    });
    editModal.present();
  }

}
