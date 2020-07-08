import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from '../service/event-emitter.service'; 
import { LocalServerService } from '../service/local-server.service';
import { ServerService } from '../service/server.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
declare var $: any;

@Component({
  selector: 'app-my-route',
  templateUrl: './my-route.component.html',
  styleUrls: ['./my-route.component.css']
})
export class MyRouteComponent implements OnInit {

  public user; downloadNotice; uploadNotice; dataLog;

  constructor(
    private eventEmitterService: EventEmitterService,
    public rout: Router, 
    private localServer: LocalServerService,
    private server: ServerService) { }

  ngOnInit(): void {
    // ensure camera is off
    sessionStorage.setItem("cam", "null");

    this.downloadNotice = 'Download Call Schedule';
    this.uploadNotice = 'Upload Pending Information';
    this.user = localStorage.getItem('userId');
  }

  backFunc() {
    this.rout.navigate(['']);
    this.eventEmitterService.OpenSideBar();    
  }

  addPocAndShowDailyShedule() {
    this.rout.navigate(['DailySchedule']);
  }

  downloadCallSchedule() {
    this.downloadNotice = 'Downloading...';
    this.server.getData(this.user).subscribe(data=>{
      this.localServer.updateLocalDisk(data.pocs);
      // download location
      // this.getLocationOfBdr();
      this.downloadNotice = 'Successfully Downloaded!'
    }, error => this.handleError(error.status))
  }



  uploadPendingInformation() {
    this.uploadNotice = 'Uploading...';
    let dataToUpload = this.localServer.supplyDataFromLocalStorage();
    this.dataLog = [];
    
    for (let i = 0; i < dataToUpload.length; i++) {
      if(dataToUpload[i].altered) {
        this.dataLog.push(dataToUpload[i]);
      }
    }

    if(this.dataLog.length == 0) {
      this.uploadNotice = 'No task to be updated!';
    }

    else {
      this.server.uploadDataFrmLocalServer(dataToUpload).subscribe(data=>{
        this.uploadNotice = 'Successfully updated!';
      }, error => this.handleError(error.status))
    }
  }

  handleError(status) {
    this.uploadNotice = 'Network Error';
  }
}
