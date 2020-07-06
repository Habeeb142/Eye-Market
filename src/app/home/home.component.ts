import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  public day;
  public beach;
  public fakerIt;
  public marker;
  public dataCollector;
  public coord;
  public userId;

  constructor(
    private auth: AuthService,
    public rout: Router,
    private server: ServerService
  ) { }

  ngOnInit(): void {
    this.dataFunc();
    this.day = this.dateFunc();
    this.coord = this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
          localStorage.setItem('lat', position.coords.latitude.toString());
          localStorage.setItem('long', position.coords.longitude.toString());
      });
      let lat = parseFloat(localStorage.getItem('lat'));
      let long = parseFloat(localStorage.getItem('long'));
  
      return {lat, long}
    }
  }

  initMap(data) {
    this.dataCollector = data;
    let lat = parseFloat(this.dataCollector[0].latitude);
    let long = parseFloat(this.dataCollector[0].longitude);

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        // center: {lat: this.coord.lat, lng: this.coord.long }
        center: { lat: lat, lng: long }
      });
      this.setMarkers(map); 
    }

  setMarkers(map) {
    for (var i = 0; i < this.dataCollector.length; i++) {
      this.marker = new google.maps.Marker({
      map: map,
      // draggable: true,
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      animation: google.maps.Animation.DROP,
      position: {lat: parseFloat(this.dataCollector[i].latitude), lng: parseFloat(this.dataCollector[i].longitude) },
      title: this.dataCollector[i].outlet
    });
  
    // var content = 'write up';
    // var infowindow = new google.maps.InfoWindow()
    
    // google.maps.event.addListener(this.marker,'click', (function(marker,content,infowindow,){ 
    //   return function() {
    //     infowindow.setContent(content);
    //     infowindow.open(map,marker);
    // };
    // })(this.marker,content,infowindow));
  }
}

  dataFunc() {

    this.userId = localStorage.getItem('userId');

    this.server.getData(this.userId).subscribe(data=>{
      this.dataCollector = data.pocs;
      this.initMap(this.dataCollector);
    })
    
  }

  dateFunc() {
    switch(new Date().getDay()) {
      case 1:
        return 'Monday';
        break;
      case 2:
        return 'Tuesday';
        break;
      case 3:
        return 'Wednesday';
        break;
      case 4:
        return 'Thursday';
        break;
      case 5:
        return 'Friday';
        break;
      case 6:
        return 'Saturday';
        break;
      case 0:
        return 'Sunday';
        break;
    }
  }

  closeCallShedule() {
    document.getElementById('callShedule').style.display = 'none'
  }

}
