import { DbconnectorProvider } from './../../providers/dbconnector/dbconnector';
import { Booking } from './../../models/Booking';
import { AngularFireAuth } from 'angularfire2/auth';
import { Payment } from './../../models/Payment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { convertToView } from 'ionic-angular/navigation/nav-util';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  payment = {} as Payment;
  price: any;
  booking = {} as Booking;
  bookingId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afd: AngularFireAuth, private dbCon: DbconnectorProvider) {
    this.price = this.navParams.get('payment');
    this.booking = this.navParams.get('booking');
    this.bookingId = navParams.get('bookingId');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');

    this.payment.user = this.afd.auth.currentUser.uid;
    this.payment.paymentAmount = this.price;

  }

  payNow() {
    this.booking.payment="paid";   
    this.dbCon.makePayment(this.payment.user, this.bookingId, this.booking);

  }

}
