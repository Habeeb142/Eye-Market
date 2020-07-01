import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public notice = 'Sign In';
  constructor(private auth: AuthService) { }

  public user = {
    userId: null,
    password: null
  }

  ngOnInit(): void {
  }
  
  login(): void {
    if(this.user.userId==null || this.user.password==null) {
      this.notice = 'Please fill all input boxes correctly'
    }
    else {
      this.notice = 'Sign In';
      // when back frm login
      this.auth.setAuth(this.user.userId);
      window.location.reload(false);
    }
  }

}
