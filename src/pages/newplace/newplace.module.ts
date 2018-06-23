import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewplacePage } from './newplace';

@NgModule({
  declarations: [
    NewplacePage,
  ],
  imports: [
    IonicPageModule.forChild(NewplacePage),
  ],
})
export class NewplacePageModule {}
