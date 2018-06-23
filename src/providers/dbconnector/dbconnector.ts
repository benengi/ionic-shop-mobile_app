import { Booking } from './../../models/Booking';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Shop } from '../../models/Shop';
import { User } from '@firebase/auth-types';


@Injectable()
export class DbconnectorProvider {

  
  placeslist : AngularFireList<any>;
  comments : Comment[];

  constructor(public http: HttpClient, private afd: AngularFireDatabase) {
    console.log('Hello DbconnectorProvider Provider');
  }

  addNewPlace(shop : Shop){
    return this.afd.list('places').push(shop);
  }

  getAllPlaces(){
    return this.afd.list('places').valueChanges();     
  }

  getPlacesByType(type){    
    return this.afd.list('places/'+type).valueChanges();    
  }

  addnewUser(user: string){
    return this.afd.list('users');
  }
  
  getAllCommentbyPlaceName(placeName){
    return this.afd.list('comments/'+placeName);
  }

  addComment(comment, placeName){    
    return this.afd.list('comments/'+placeName).push(comment);
  }

  addBooking(Booking, placeName){
    return this.afd.list('bookings/'+placeName).push(Booking);
  }

  getBookings(uid){
    return this.afd.list('bookings/'+uid);
  }

  makePayment(uid, bid, Booking){
    return this.afd.list('bookings/'+uid).update(bid,Booking);
  }

  deleteBooking(bid, uid){
    return this.afd.list('bookings/'+uid).remove(bid);
  }

  placeOrder(shopType,shopId, order){
    debugger;
    return this.afd.list('places/'+shopType+'/'+shopId+'/info/orders').push(order);
  }
 
}
