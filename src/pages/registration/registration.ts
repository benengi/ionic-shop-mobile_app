import { DbconnectorProvider } from './../../providers/dbconnector/dbconnector';
import { TabsPage } from './../tabs/tabs';
import { MainPage } from './../main/main';
import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/User';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  user = {} as User;
  conPassword: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
    private toast: ToastController, public loadingCtrl: LoadingController, private dbCon: DbconnectorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  async register(user: User) {
    if (user.password == this.conPassword) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      try {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(
          user.email,
          user.password
        );
        if (result) {
          loading.dismiss();
          // this.navCtrl.push(LoginPage);
          var curentuser = this.afAuth.auth.currentUser.uid;
          debugger;
          //this.dbCon.addnewUser(curentuser);
          this.navCtrl.setRoot(TabsPage);
        } else {
          loading.dismiss();
          let toast = this.toast.create({
            message: result.message,
            duration: 3000
          });
          toast.present();
        }
      } catch (e) {
        loading.dismiss();
        console.error(e);
        let toast = this.toast.create({
          message: e,
          duration: 3000
        });
        toast.present();
      }
    } else {

      let toast = this.toast.create({
        message: 'Passwords are not matched!',
        duration: 3000
      });
      toast.present();
    }
  }

  gotoSignIn() {
    this.navCtrl.pop();
  }

}
