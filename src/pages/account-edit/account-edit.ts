import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.html',
})
export class AccountEditPage {

  @ViewChild('fileInput') fileInput;
  currentUser: User;
  form: FormGroup;
  isReadyToSave: boolean;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private camera: Camera
  ) {
    this.currentUser = this.navParams.get('user');

    this.form = formBuilder.group({
      image: ['']
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
      }).then((data) => {
        this.form.patchValue({ 'image': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'image': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getImageStyle() {
    return 'url(' + this.form.controls['image'].value + ')'
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.currentUser.image = this.form.controls['image'].value;
    this.viewCtrl.dismiss(this.currentUser);
  }

}
