import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { ServerService } from './service/server.service';
import { LocalServerService } from "./service/local-server.service";

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

      (this.amOnline) ? this.checkServerStorage() : null;

    }
    else {
      // alert(false)
    }
  }

  checkServerStorage() {
    console.log(this.localServer.checkDisk())
  }

}
