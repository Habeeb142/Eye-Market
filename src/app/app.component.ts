import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { ServerService } from './service/server.service';
import { LocalServerService } from "./service/local-server.service";
import { stringify } from '@angular/compiler/src/util';

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

  constructor(private auth: AuthService, private server: ServerService, private localServer: LocalServerService) { }

  ngOnInit() {
    if(this.isAuthenticated = this.auth.isAuthenticated()) {
      this.user = localStorage.getItem('userId');
      this.amOnline = this.server.checkIfIAmOnline();

      (this.amOnline) ? this.getDataFromServer() : null;

    }
    else {
      // alert(false)
    }

  }

  getDataFromServer() {
    this.server.getData(this.user).subscribe(data=>{
      this.localServer.updateLocalDisk(data.pocs);
    }, error => this.handleError(error.status))
  }


  handleError(status) {
    alert('Network Error')!
  }

}
