import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceslistPage } from './placeslist';

@NgModule({
  declarations: [
    PlaceslistPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceslistPage),
  ],
})
export class PlaceslistPageModule {}
