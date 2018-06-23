import { AngularFireAuth } from 'angularfire2/auth';
import { DbconnectorProvider } from './../../providers/dbconnector/dbconnector';
import { Booking } from './../../models/Booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookingdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookingdetails',
  templateUrl: 'bookingdetails.html',
})
export class BookingdetailsPage {

  booking = {} as Booking;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbCon:DbconnectorProvider,
  private auth:AngularFireAuth) {
    this.booking=this.navParams.get('booking');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingdetailsPage');
  }

  cancle(booking){
    debugger;
    this.dbCon.deleteBooking(booking.$key,this.auth.auth.currentUser.uid);
  }

}
