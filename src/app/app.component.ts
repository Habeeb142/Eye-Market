import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { ServerService } from './service/server.service';
import { LocalServerService } from "./service/local-server.service";
import { Env } from "./env";
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eye-market';
  public user;
  public data;
  public amOnline: boolean;
  public activate;
  isAuthenticated: boolean;
  ne = [];
  public pocCoord = {
    lat: null,
    long: null
  }

  constructor(private auth: AuthService, private server: ServerService, private localServer: LocalServerService) { }

  ngOnInit() {
    if(this.isAuthenticated = this.auth.isAuthenticated()) {
      this.user = localStorage.getItem('userId');
      this.amOnline = this.server.checkIfIAmOnline();

      if(this.amOnline && this.localServer.supplyDataFromLocalStorage()!==null) {
        this.server.uploadDataFrmLocalServer(this.localServer.supplyDataFromLocalStorage());
        this.getDataFromServer();
      } 

      else {
        this.getDataFromServer();
        this.server.uploadDataFrmLocalServer(this.localServer.supplyDataFromLocalStorage());
        window.location.reload(false);
      }
    }

  }

  getDataFromServer() {
    this.server.getData(this.user).subscribe(data=>{
      // function to push address and distance and getting it into localserver
      this.updateLocalServerWithAddressAndDistance(data.pocs);
    }, error => this.handleError(error.status))
  }

  // function to update address and distance;
  updateLocalServerWithAddressAndDistance(oldData) {

    oldData.forEach(element => {
      this.pocCoord.lat = element.latitude; 
      this.pocCoord.long = element.longitude; 
      //  get distance
        let distance = this.server.getPocValidation(this.pocCoord);
        element.distance = distance.toFixed(2);
       // get Address
        fetch(new Env().ADDRESS_API + this.pocCoord.lat + "," + this.pocCoord.lat + "&key=" +
          new Env().API_KEY ).then((response) => response.json()).then((responseJson) => {

            if (responseJson.results.length > 1) {
              // update local server
              element.address = responseJson.results[0].formatted_address;
              this.ne.push(element);
              this.localServer.updateLocalDisk(this.ne);

            } else {
              element.address = "Address not Found";
              this.ne.push(element);
              this.localServer.updateLocalDisk(this.ne);
            }
          })
          .catch((error) => console.log("error"));
        });
    // return this.ne;

  }


  handleError(status) {
    alert('Network Error')!
  }

}
