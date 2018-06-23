import { AngularFireAuth } from 'angularfire2/auth';
import { DbconnectorProvider } from './../../providers/dbconnector/dbconnector';
import { Comment } from './../../models/Comment';
import { MakereservationPage } from './../makereservation/makereservation';
import { Shop } from './../../models/Shop';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimateTimings } from '@angular/core/src/animation/dsl';

/**
 * Generated class for the PlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  shop = {} as any;
  comment = {
    comment: "",
    name : ""
  };
  commentText : any;
shopType:any;

  comments = [] as Comment [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbCon:DbconnectorProvider,
  private adf : AngularFireAuth) {    
    this.shop = this.navParams.get('place');

    this.shopType=this.navParams.get('shopType');

    console.log(this.shop);
    this.comment.comment = "";
    this.comment.name = "";
    
  }

  ionViewDidLoad() {
    this.comments = [];    
    console.log('ionViewDidLoad PlacePage');
    this.loadComments();
    this.comment.comment = "";
    this.comment.name = "";
  }

  gotoReservation(shop: Shop) {
    this.navCtrl.push(MakereservationPage, {
      shop: shop,
      shopType:this.shopType
    });
  }

  saveComment(){
    this.comment.comment = this.commentText;
    this.comment.name = this.adf.auth.currentUser.displayName;
    this.dbCon.addComment(this.comment, this.shop.name);
    this.commentText = "";
  }

  loadComments(){
   
    var commentsList = this.dbCon.getAllCommentbyPlaceName(this.shop.name);
    commentsList.snapshotChanges().subscribe(item =>{
      this.comments = [];
      item.forEach(element => {
        var listItem = element.payload.toJSON();
        listItem['$key'] = element.key;        
        console.log(listItem);
        this.comments.push(listItem as Comment);
      });
    })
  }

}
