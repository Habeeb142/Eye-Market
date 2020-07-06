import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.css']
})
export class PocComponent implements OnInit {

  public pocId; loading:boolean; success:boolean; failure: boolean;

  constructor(public actRoute: ActivatedRoute, private server: ServerService) { }

  ngOnInit(): void {
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
    this.loading = true;
    this.success =  this.failure = !this.loading;
    this.server.getPocValidation(pocId).subscribe(data=>{
      (data.data == undefined)? this.redo() : this.proceed(data);
    }, error => this.handleError(error.status))
  }

  handleError(status) {
    this.getPocValidation(this.pocId);
  }

  proceed(data) {
    if(parseFloat(data.data) > 50) {
      this.loading = true;
        this.failure = true;
        this.success = !this.failure;
    }
    else {
      this.loading = true;
      this.success = true;
      this.failure = !this.success
    }
  }

  redo() {
    this.getPocValidation(this.pocId)
  }

  okThanks():void {
    this.loading = false;
  }

  snapShot(): void {
    if(this.success) {
      alert('Yo man!, i am about opening your camera');
    }
    else {
      alert('Sorry man!, i cant open your camera, proximity beyond 50m')
    }
  }

}
