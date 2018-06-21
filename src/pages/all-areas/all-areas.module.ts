import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AllAreasPage } from './all-areas';

@NgModule({
  declarations: [
    AllAreasPage,
  ],
  imports: [
    IonicPageModule.forChild(AllAreasPage),
    TranslateModule.forChild()
  ],
  exports: [
    AllAreasPage
  ]
})
export class AllAreasPageModule {}
