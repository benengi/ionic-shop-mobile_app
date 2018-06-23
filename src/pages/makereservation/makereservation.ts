import { PaymentPage } from './../payment/payment';
import { DbconnectorProvider } from './../../providers/dbconnector/dbconnector';
import { Booking } from './../../models/Booking';
import { User } from './../../models/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../models/Shop';


@IonicPage()
@Component({
  selector: 'page-makereservation',
  templateUrl: 'makereservation.html',
})
export class MakereservationPage {

  shop = {} as any;
  user = {} as User;

  shopType :any;

  order = {} as any;

  booking = {} as Booking;

  price :any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afd:AngularFireAuth,
  private dbCon : DbconnectorProvider) {
    this.shop = this.navParams.get('shop');
    this.shopType = this.navParams.get('shopType');

    //this.booking.price = this.shop.pricePerUnit;    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakereservationPage');
    this.LoadUser();
    
  }

  LoadUser(){

    var User = this.afd.auth.currentUser;
    this.user.email = User.email;
    this.user.fullname = User.displayName;

  }

  book(){

    this.booking.fullname = this.user.fullname;
    this.booking.email=this.user.email;
    this.booking.mobile=this.user.phone;
    this.booking.price = this.price;
    this.booking.shopName = this.shop.name;
    this.booking.payment = "pending";
    
    var val = this.dbCon.addBooking(this.booking,this.afd.auth.currentUser.uid);
    
    this.navCtrl.push(PaymentPage, {
      payment :this.booking.price,
      bookingId : val.key,
      booking:this.booking
    });
    
  }

  placeOrder(){

    this.order.customer = this.afd.auth.currentUser.uid;
    this.order.item = "testing";
    this.order.quantity = 1;
    this.order.price = 250;
    this.order.paymentStatus = "paid"

    debugger;
    var val = this.dbCon.placeOrder(this.shopType,this.shop.key, this.order);

  }

  updatePrice(){
    var val = parseFloat( this.booking.price) *  parseInt(this.booking.tables);
    this.booking.price =  val.toString();

  }

  gotoPayment(){
    this.navCtrl.push(PaymentPage);
  }



}
