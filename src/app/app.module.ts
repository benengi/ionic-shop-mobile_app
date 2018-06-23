import { BookingdetailsPage } from './../pages/bookingdetails/bookingdetails';
import { PaymentPage } from './../pages/payment/payment';
import { HistoryPage } from './../pages/history/history';
import { MakereservationPage } from './../pages/makereservation/makereservation';
import { ProfilePage } from './../pages/profile/profile';
import { PlacePage } from './../pages/place/place';
import { NewplacePage } from './../pages/newplace/newplace';
import { MainPage } from './../pages/main/main';
import { RegistrationPage } from './../pages/registration/registration';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Geolocation } from '@ionic-native/geolocation';
import { DbconnectorProvider } from '../providers/dbconnector/dbconnector';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { SettingsPage } from '../pages/settings/settings';

const firebaseConfig = {
  apiKey: "AIzaSyB4GnJL1xVKOzCxG7uk_soJ36OrezKWBa4",
  authDomain: "shopwiseproj.firebaseapp.com",
  databaseURL: "https://shopwiseproj.firebaseio.com",
  projectId: "shopwiseproj",
  storageBucket: "shopwiseproj.appspot.com",
  messagingSenderId: "75026282896"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistrationPage,
    MainPage,
    NewplacePage,
    PlacePage,
    ProfilePage,
    MakereservationPage,
    SettingsPage,
    HistoryPage,
    PaymentPage,
    BookingdetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistrationPage,
    MainPage,
    NewplacePage,
    PlacePage,
    ProfilePage,
    MakereservationPage,
    SettingsPage,
    HistoryPage,
    PaymentPage,
    BookingdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Geolocation,
    GoogleMaps,
    NativeGeocoder,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DbconnectorProvider
  ]
})
export class AppModule { }
