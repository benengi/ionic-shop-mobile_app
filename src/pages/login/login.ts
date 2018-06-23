import { TabsPage } from './../tabs/tabs';
import { MainPage } from './../main/main';
import { User } from './../../models/User';
import { RegistrationPage } from './../registration/registration';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  data: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
    private toast: ToastController, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async  signin(user : User) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
     if(user.email!="" && user.password!=""){
      try {
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        if (result) {
          loading.dismiss();          
          this.navCtrl.setRoot(TabsPage);
        }
        else{
          loading.dismiss();
          let toast = this.toast.create({
            message: result.message,
            duration: 3000
          });
          toast.present();
        }
          
      }
      catch (e) {
        loading.dismiss();
        console.error(e);
        let toast = this.toast.create({
          message: e,
          duration: 3000
        });
        toast.present();
      }
     }else{
      loading.dismiss();
      let toast = this.toast.create({
        message: 'Email or Password cannot be empty!',
        duration: 3000
      });
      toast.present();
     }
  }
  gotoRegistration() {
    this.navCtrl.push(RegistrationPage);
  }
  gotoPasswordReset() {
    //this.navCtrl.push(PasswordResetPage);
  }

}
