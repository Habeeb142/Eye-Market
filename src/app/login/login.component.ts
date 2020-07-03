import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public notice = 'Sign In';
  constructor(private auth: AuthService, private server: ServerService) { }

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
      this.server.logMeInMyDear(this.user).subscribe(data=>{
        if(data.msg == "You're logged in") {
          this.auth.setAuth(this.user.userId);
          window.location.reload(false);
        }
        else {
          this.notice = 'Incorrect Email or Password';
        }
      })
     
    }
  }

}
