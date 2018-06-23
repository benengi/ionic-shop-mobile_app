import { BookingdetailsPage } from './../bookingdetails/bookingdetails';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbconnectorProvider } from './../../providers/dbconnector/dbconnector';
import { Booking } from './../../models/Booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  bookings  = [] as Booking [];

  booking= {} as Booking;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbCon:DbconnectorProvider,
  private afd:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.loadBookings();
  }

  loadBookings(){
    var bookingList = this.dbCon.getBookings(this.afd.auth.currentUser.uid);
    bookingList.snapshotChanges().subscribe(item =>{
      this.bookings = [];
      item.forEach(element => {
        var listItem = element.payload.toJSON();
        listItem['$key'] = element.key;        
        console.log(listItem);
        this.bookings.push(listItem as Booking);
      });
    })
  }

  gotoDetails(booking){
    this.navCtrl.push(BookingdetailsPage, {
      booking:booking
    })
  }

}
