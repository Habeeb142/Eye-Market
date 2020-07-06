import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})
export class DailyScheduleComponent implements OnInit {

  public data; public day; public userId; public dailyScheduleShow: boolean; 
  public pocsToAdd = []; public markMe; public pocsOnSchedule = [];

  constructor(public rout: Router, private server: ServerService) { }

  ngOnInit(): void {  
    this.fetchData();

    document.getElementById('btnList').style.background = '#FFF';
    document.getElementById('btnList').style.color = '#b11917';

    this.dailyScheduleShow = true;
    this.markMe = 'none';

    this.day = this.dateFunc();
  }

  fetchData() {
    
    this.userId = localStorage.getItem('userId');
    this.server.getData(this.userId).subscribe(data=>{
      this.data = data.pocs;
      this.listDailySchedule(data.pocs);
    });

  }

  backFunc() {

    this.rout.navigate(['MyRoute']); 

  }

  addPoc() {

    this.dailyScheduleShow = false;
    document.getElementById('btnAdd').style.background = '#FFF';
    document.getElementById('btnAdd').style.color = '#F79520';
    document.getElementById('btnList').style.background = '#F79520';
    document.getElementById('btnList').style.color = '#FFF';
    (this.pocsToAdd.length == 0)? this.pushPocToBeAdded() : null;

  }

  pushPocToBeAdded(): void {

    this.data.forEach(element => {
      if(element.schedule !== this.day) {
        // checking if we have data in the service so as to knw wc one has bn marked(the data is the on we added to shedule)
        if(this.server.supplyPocs()!==undefined){
          
          for (let i = 0; i < this.server.supplyPocs().length; i++) {
            // checking if the data is already 
              if(this.server.supplyPocs()[i].id == element.id){
                element.markMe = true;
              }
              else {
                // element.markMe = false;
              }
            }
            this.pocsToAdd.unshift(element);
        }
        
        else{
          //checking if we have no data in d service to avoid error - undefiuned...
          this.pocsToAdd.unshift(element);
        }
      }
    });

  }

  listDailySchedule(data) {

    this.dailyScheduleShow = true;
    document.getElementById('btnList').style.background = '#FFF';
    document.getElementById('btnList').style.color = '#F79520';
    document.getElementById('btnAdd').style.background = '#F79520';
    document.getElementById('btnAdd').style.color = '#FFF';
    (this.pocsOnSchedule.length == 0)? this.pushDailySchedule(data) : null;

  }

  pushDailySchedule(data) {

    if(this.server.supplyPocs()==undefined) {
      data.forEach(element => {
        if(element.schedule == this.day) {
          this.pocsOnSchedule.unshift(element);
          this.pocsOnSchedule = Object.values(this.pocsOnSchedule.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}));
          this.pocsOnSchedule = this.pocsOnSchedule.reverse();
        }
      });

    }

    else {

      this.server.supplyPocs().forEach(element => {
          this.pocsOnSchedule.unshift(element);
          this.pocsOnSchedule = Object.values(this.pocsOnSchedule.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}));
          this.pocsOnSchedule = this.pocsOnSchedule.reverse();
      });
    }

  }

  addThisPoc(data) {
    
      (this.pocsOnSchedule.includes(data))? null: this.unShift(data);
      this.pocsOnSchedule = Object.values(this.pocsOnSchedule.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}));
      this.pocsOnSchedule = this.pocsOnSchedule.reverse();

  }

  unShift(data) {

    data.markMe = true;
    this.pocsOnSchedule.unshift(data);
    this.pocsOnSchedule = Object.values(this.pocsOnSchedule.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}))
    this.server.storeForSupplyPocs(this.pocsOnSchedule);
    
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
      case 7:
        return 'Sunday';
        break;
    }
  }

}
