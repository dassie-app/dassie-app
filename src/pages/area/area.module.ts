import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AreaPage } from './area';

@NgModule({
  declarations: [
    AreaPage,
  ],
  imports: [
    IonicPageModule.forChild(AreaPage),
    TranslateModule.forChild()
  ],
})
export class AreaDetailPageModule {}
