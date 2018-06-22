import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      mapType: 'MAP_TYPE_TERRAIN',
      controls: {
        myLocation: true,
        myLocationButton: true,
      },
      camera: {
        target: {
          lat: -25.671972,
          lng: 30.3615057
        },
        zoom: 16
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Waterval Boven',
      icon: 'blue',
      position: {
        lat: -25.671972,
        lng: 30.3615057
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });

  }
}
