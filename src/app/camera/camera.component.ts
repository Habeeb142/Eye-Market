import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LocalServerService } from '../service/local-server.service';
declare var $: any;
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  pocId; notice; amOnline; success:boolean;

  constructor(private server: ServerService, public rout: Router, private localServer: LocalServerService) { }
  
  ngOnInit(): void {

    // check IFU RE BN ROUTED WEL
    this.getPocId();
    this.success = false;
    this.amOnline = this.server.checkIfIAmOnline();

    $(document).ready(function(){
      
      var photo = document.getElementById('photo');
      var video = document.querySelector('video');
      var canvas = document.querySelector('canvas');
      var startButton = document.getElementById('startbutton');
      var proceed = document.getElementById('proceed');
      var reSnap = document.getElementById('reSnap');

      var context = canvas.getContext('2d');
      var w, h, ratio;

      video.addEventListener('loadedmetadata', function() {
        ratio = video.videoWidth / video.videoHeight;
        w = video.videoWidth - 100;
        h = w/ratio;
        canvas.width = w;
        canvas.height = parseInt(h, 10);
        
      }, false);

      $('#startbutton').click(function(){
        // u can use this function to snap any thing u want
        context.fillRect(0, 0, w, h);
        context.drawImage(video, 0, 0, w, h);
        
        photo.style.display = 'block';
        video.style.display = 'none';
        startButton.style.display = 'none';
        proceed.style.display = 'block';
        reSnap.style.display = 'block';

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        // incase u need fr fdownload of image
        // document.getElementById('img').setAttribute('href', data);
        // use for what u want
        console.log(data);
        
      })

      $('#reSnap').click(function(){
        photo.style.display = 'none';
        video.style.display = 'block';
        startButton.style.display = 'block';
        proceed.style.display = 'none';
        reSnap.style.display = 'none';

      })

    });

    this.notice = 'Proceed';
  }

  getPocId() {
    this.pocId = this.server.getPocIdBack();
    if(this.pocId == undefined) {
      this.rout.navigate(['']);
    }
  }

  proceed() {
    let dataFrmStore = this.localServer.supplyDataFromLocalStorage();
    // console.log(this.pocId)
      for (let i = 0; i < dataFrmStore.length; i++) {
        
        if(dataFrmStore[i].id == this.pocId) {
          dataFrmStore[i].traffic = 'pending';
          dataFrmStore[i].altered = true;
          dataFrmStore[i].dayOfAltered = new Date().getDay();
        }
        
      }
      this.localServer.updateLocalDisk(dataFrmStore);
      this.notice='Updating...';
      // check of am online
      if(this.amOnline) {

        this.server.uploadDataFrmLocalServer(dataFrmStore).subscribe(data=>{
          this.notice = 'Proceed';
          this.success = true;
          document.getElementById('photo').style.display='none';
          document.getElementById('video').style.display='none';
          document.getElementById('reSnap').style.display='none';
          document.getElementById('proceed').style.display='none';
          document.getElementById('startbutton').style.display='none';

          setTimeout(() => {
            this.rout.navigate(['MyRoute']);
          }, 5000);
  
        }, error => this.handleError(error.status))

      }

      else {
        this.notice = 'Proceed';
        this.success = true;
        document.getElementById('photo').style.display='none';
        document.getElementById('video').style.display='none';
        document.getElementById('reSnap').style.display='none';
        document.getElementById('proceed').style.display='none';
        document.getElementById('startbutton').style.display='none';

        setTimeout(() => {
          this.rout.navigate(['MyRoute']);
        }, 5000);

      }
  }
  
  handleError(status) {
    alert('Network Error, Please go to upload when the network is available');
    this.notice = 'Proceed';
    this.rout.navigate(['MyRoute']);
  }


}
