import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eye-market';
  public user;
  
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.user = localStorage.getItem('userId');
    }
    else {
      alert(false)
    }
  }
}
