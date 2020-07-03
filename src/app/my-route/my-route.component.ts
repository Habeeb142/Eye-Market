import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from '../service/event-emitter.service'; 
declare var $: any;

@Component({
  selector: 'app-my-route',
  templateUrl: './my-route.component.html',
  styleUrls: ['./my-route.component.css']
})
export class MyRouteComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService, public rout: Router) { }

  ngOnInit(): void {
  }

  backFunc() {
    this.rout.navigate(['']);
    this.eventEmitterService.OpenSideBar();    
  }

  addPocAndShowDailyShedule() {
    this.rout.navigate(['DailySchedule']);
  }
}
