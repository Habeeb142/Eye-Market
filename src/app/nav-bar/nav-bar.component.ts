import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../service/event-emitter.service'; 
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private eventEmitterService: EventEmitterService, private auth: AuthService) { }

  ngOnInit(): void {
    // check if isAuthenticated
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  openSideNav(){    
    this.eventEmitterService.OpenSideBar();    
  } 

}
