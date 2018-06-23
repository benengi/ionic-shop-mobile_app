import { User } from './../../models/User';
import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth
    , private app: App) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.loadUser();
  }

  logout() {
    this.afAuth.auth.signOut();
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  loadUser() {

    var User = this.afAuth.auth.currentUser;
    this.user.email = User.email;
    this.user.fullname = User.displayName;
    this.user.phone = User.phoneNumber;
    this.user.photo = User.photoURL;

  }

  updateUserProfile(){
    var User =this.afAuth.auth.currentUser;

    User.updateProfile({
      displayName:this.user.fullname,
      photoURL:"https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100",
      
    });   
    
  }

}
