import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})
export class DailyScheduleComponent implements OnInit {

  public data; public day; public userId;

  constructor(public rout: Router, private server: ServerService) { }

  ngOnInit(): void {  
    document.getElementById('btnList').style.background = '#FFF';
    document.getElementById('btnList').style.color = '#b11917';

    this.fetchData();
    this.day = this.dateFunc();
  }

  fetchData() {
    this.userId = localStorage.getItem('userId');
    this.server.getData(this.userId).subscribe(data=>{
      this.data = data.pocs;
    })
  }

  backFunc() {
    this.rout.navigate(['MyRoute']);  
  }

  addPoc() {
    document.getElementById('addPoc').style.display = 'block';
    document.getElementById('listDailySchedule').style.display = 'none';
    document.getElementById('btnAdd').style.background = '#FFF';
    document.getElementById('btnAdd').style.color = '#b11917';
    document.getElementById('btnList').style.background = '#B11917';
    document.getElementById('btnList').style.color = '#FFF';
  }

  listDailySchedule() {
    document.getElementById('addPoc').style.display = 'none';
    document.getElementById('listDailySchedule').style.display = 'block';
    document.getElementById('btnList').style.background = '#FFF';
    document.getElementById('btnList').style.color = '#b11917';
    document.getElementById('btnAdd').style.background = '#B11917';
    document.getElementById('btnAdd').style.color = '#FFF';
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

  addThisPoc(data) {
    this.data.unshift(data);
    document.getElementById(data.id).style.display = 'block';
    document.getElementById('_'+data.id).style.display = 'none';
  }

}
