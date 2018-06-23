import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakereservationPage } from './makereservation';

@NgModule({
  declarations: [
    MakereservationPage,
  ],
  imports: [
    IonicPageModule.forChild(MakereservationPage),
  ],
})
export class MakereservationPageModule {}
