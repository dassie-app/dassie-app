import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Account } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  profile;

  constructor(
    public navCtrl: NavController,
    private account: Account,
    private modalCtrl: ModalController
  ) {
    this.account.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  ionViewDidLoad() {
  }

  editAccount() {
    let editModal = this.modalCtrl.create('AccountEditPage', { profile: this.profile });
    editModal.onDidDismiss(user => {
      if(user) {
        this.account.saveUser(user);
      }
    });
    editModal.present();
  }

}
