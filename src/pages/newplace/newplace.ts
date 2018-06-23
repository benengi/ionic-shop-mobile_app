import { DbconnectorProvider } from './../../providers/dbconnector/dbconnector';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../models/Shop';

/**
 * Generated class for the NewplacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newplace',
  templateUrl: 'newplace.html',
})
export class NewplacePage {

  shop  = {} as Shop;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbCon : DbconnectorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewplacePage');
  }

  addTothedb(){
    this.dbCon.addNewPlace(this.shop);
  }

}
