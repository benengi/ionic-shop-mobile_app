import { PlacePage } from './../place/place';
import { DbconnectorProvider } from './../../providers/dbconnector/dbconnector';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Shop } from '../../models/Shop';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Geocoder
} from '@ionic-native/google-maps';

declare var google;

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  placesList: any;
  shopType:any;

  mycity: any;
  places: Shop[];

  myLocation = {} as any;

  shops = [] as any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,
    private dbCon: DbconnectorProvider, private geocoder: NativeGeocoder) {
    this.places = [];

    this.myLocation.lat = "";
    this.myLocation.lng = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.places = [];



    this.loadMap();
    //this.showPlacesInMap();

  }

  async loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.myLocation.lat = position.coords.latitude;
      this.myLocation.lng = position.coords.longitude;

      let mapOptions = {
        center: latLng,
        zoom: 15,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.roadmap,
        mapTypeControl: false,
        fullscreenControl: false
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();

    }, (err) => {
      console.log(err);
    });

  }

  addMarker() {
    var image = 'assets/imgs/currentlocation.png'

    let marker = new google.maps.Marker({
      map: this.map,
      //animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: image,
    });

    let content = "<h4>You are here</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  showPlacesInMap() {
    //this.shops = this.dbCon.getAllPlaces();
    this.shops.forEach(place => {
      
        let lt = place.info.shopLat;
        let ln = place.info.shopLong;
        console.log(place);
        let ltln = new google.maps.LatLng(lt, ln);
        var maker = this.showMaker(ltln, this.map, place);
      
    });

  }

  showMaker(position, map, place) {
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(place.info.shopLat, place.info.shopLong)
    });

    let content = place.name;
    this.showInfoWindow(marker, content, place);
  }

  showInfoWindow(marker, content, place) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      this.navCtrl.push(PlacePage, {
        place: place,
        shopType : this.shopType
      })
    });

  }

  getHotels() {
    this.shopType="hotels";
    this.placesList = this.dbCon.getPlacesByType("hotels");
    this.placesList.forEach(items => {
      items.forEach(item => {
        console.log(item);
        this.shops = items;        
      });
    });    
    
    this.showPlacesInMap();
  }

  getResturents() {

    this.shopType="restaurent";
    this.placesList = this.dbCon.getPlacesByType("restaurent");
    console.log(this.placesList);
    this.placesList.forEach(items => {
      console.log(items);
      items.forEach(item => {
        console.log(item);
        this.shops = items;
      });
    });
    
    this.showPlacesInMap();
  }
}
