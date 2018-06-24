import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AccountEditPage } from './account-edit';

@NgModule({
  declarations: [
    AccountEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountEditPage),
    TranslateModule.forChild()
  ],
})
export class AccountEditPageModule {}
