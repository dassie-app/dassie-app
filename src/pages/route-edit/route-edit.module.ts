import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RouteEditPage } from './route-edit';

@NgModule({
  declarations: [
    RouteEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteEditPage),
    TranslateModule.forChild()
  ],
})
export class RouteEditPageModule {}
