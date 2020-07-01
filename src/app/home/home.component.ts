import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  constructor(private auth: AuthService, public rout: Router) { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 6.9075, lng: 3.5813 }
      });
  }

}
