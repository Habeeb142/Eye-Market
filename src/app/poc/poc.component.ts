import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.css']
})
export class PocComponent implements OnInit {

  public pocId; loading:boolean; success:boolean; failure: boolean; alert;

  public pocCoord = {
    lat: null,
    long: null
  }

  constructor(public actRoute: ActivatedRoute, private server: ServerService, public rout: Router) { }

  ngOnInit(): void {
    this.alert = 'Take Photo';
    this.getPocId();
    // call function todo what needs to be done
    this.getPocValidation(this.pocId);
  }

  getPocId() {
    this.actRoute.paramMap.subscribe((param => {
        this.pocId = param.get('pocId');
    }))
  }

  getPocValidation(pocId) {
     let data = JSON.parse(localStorage.getItem('data'));

     data.forEach(element => {
       if(element.id==pocId){
         this.pocCoord.lat = element.latitude;
         this.pocCoord.long = element.longitude;
       }
     });

    this.loading = true;
    this.success =  this.failure = !this.loading;
    this.proceed(this.server.getPocValidation(this.pocCoord))
  }

  handleError() {
    this.alert = 'Cannot open Camera!';
  }

  proceed(data) {
    if(data > 150) {
      this.loading = true;
        this.failure = true;
        this.success = !this.failure;
    }
    else if(data <= 150){
      this.loading = true;
      this.success = true;
      sessionStorage.setItem("cam", "true");
      this.failure = !this.success;
      this.okThanks();
    }
  }


  okThanks():void {
    this.loading = false;
  }

  snapShot(): void {
    if(this.success) {
      this.server.tempStoreDataForCamera(this.pocId);
      this.rout.navigate(['camera']);
    }
    else {
      alert("I can't open your camera, proximity beyond 50m");
    }
  }

  backFunc() {
    this.rout.navigate(['MyRoute'])
  }

}
